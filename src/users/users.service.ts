import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesService } from "src/roles/roles.service";
import { Repository } from "typeorm";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";



@Injectable()

export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private rolesService: RolesService
      ) {}

    async getAllUsers(): Promise<User[]> {
        const users = await this.usersRepository.find({relations: {roles: true}})
        return users
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.save(dto)
        const role = await this.rolesService.getRoleByValue("USER")
        user.roles = [role]
        await this.usersRepository.save(user)
        return user
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({where: {email}, relations: {roles: true}})
        return user
    }

    async giveRole(dto: AddRoleDto): Promise<User> {
        const user = await this.usersRepository.findOne({where: {id: dto.userId}, relations: {roles: true}})
        if (!user) {
            throw new HttpException("Invalid user's id", HttpStatus.BAD_REQUEST)
        }
        const role = await this.rolesService.getRoleByValue(dto.value)
        if (!role) {
            throw new HttpException("This role wasn't found", HttpStatus.BAD_REQUEST)
        }
        user.roles.push(role)
        await this.usersRepository.save(user)
        return user
    }

    async banUser(dto: BanUserDto): Promise<User> {
        const user = await this.usersRepository.findOne({where: {id: dto.userId}, relations: {roles: true}})
        user.banned = true
        user.banReason = dto.banReason
        await this.usersRepository.save(user)
        return user
    }
}