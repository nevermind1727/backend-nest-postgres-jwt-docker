import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async registration(dto: CreateUserDto) {
        const candidate = await this.usersService.findUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException("User with this email already registered", HttpStatus.BAD_REQUEST)
        }
        const newPass = await bcrypt.hash(dto.password, 5)
        const user = await this.usersService.createUser({...dto, password: newPass})
        return this.generateToken(user)
    }

    async login (dto: CreateUserDto) {
        const candidate = await this.usersService.findUserByEmail(dto.email)
        if (!candidate) {
            throw new UnauthorizedException({message: 'Invalid email address'})
        }
        const comparePass = await bcrypt.compare(dto.password, candidate.password)
        if (!comparePass) {
            throw new UnauthorizedException({message: 'Invalid password'})
        }
        return this.generateToken(candidate)
    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
