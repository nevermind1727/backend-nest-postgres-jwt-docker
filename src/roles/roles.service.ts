import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role)
    private rolesRepository: Repository<Role>,) {}

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = await this.rolesRepository.save(dto)
        return role
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.rolesRepository.findOne({where: {value: value}})
        return role
    }

    async getAllRoles(): Promise<Role[]> {
        const roles = await this.rolesRepository.find()
        return roles
    }
}
