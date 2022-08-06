import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/registration")
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto)
    }
    
    @Post("/login")
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto)
    }
}
