import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "src/roles/roles.decorator";
import { RolesGuard } from "src/roles/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";

@ApiTags('users')
@Controller("/users")
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({ status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    getAllUsers() {
        return this.usersService.getAllUsers()
    }

    @Post()
    @ApiOperation({summary: 'User creation'})
    @ApiResponse({ status: 201, type: User})
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto)
    }

    @Post("/role")
    @ApiOperation({summary: 'Give role to the particular user'})
    @ApiResponse({ status: 200, type: User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    giveRole(@Body() dto: AddRoleDto) {
        return this.usersService.giveRole(dto)
    }

    @Post("/ban")
    @ApiOperation({summary: 'Ban particular user'})
    @ApiResponse({ status: 200, type: User})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    banUser(@Body() dto: BanUserDto) {
        return this.usersService.banUser(dto)
    }
}
