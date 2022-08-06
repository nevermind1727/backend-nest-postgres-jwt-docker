import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @Post()
    @ApiOperation({summary: 'Create user role'})
    @ApiResponse({ status: 201, type: Role})
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @Get()
    @ApiOperation({summary: 'Get all user roles'})
    @ApiResponse({ status: 200, type: [Role]})
    getAllRoles() {
        return this.rolesService.getAllRoles()
    }
    
    @Get("/:value")
    @ApiOperation({summary: 'Get user role by value'})
    @ApiResponse({ status: 200, type: Role})
    getRoleByValue(@Param("value") value: string) {
        return this.rolesService.getRoleByValue(value)
    }
}
