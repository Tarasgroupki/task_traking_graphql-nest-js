import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {RoleHasPermission} from './role_has_permission.entity';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>,
                @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
                @InjectRepository(RoleHasPermission) private readonly roleHasPermissionRepository: Repository<RoleHasPermission>,
    ) {

    }

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find();
    }

    async findAllPerms(): Promise<Permission[]> {
        return await this.permissionRepository.find();
    }

    async createRole(role: Role): Promise<Role> {
        return this.roleRepository.save(role);
    }

    async createRoleHasPermissions(roleHasPermissions: RoleHasPermission): Promise<RoleHasPermission> {
        return this.roleHasPermissionRepository.save(roleHasPermissions);
    }

    async findOne(id): Promise<Role[]> {
        return await this.roleRepository.find({id});
    }

    async findOnePerm(id): Promise<Permission[]> {
        return await this.permissionRepository.find({id});
    }

    async findOneRoleHasPermById(id): Promise<RoleHasPermission[]> {
        return await this.roleHasPermissionRepository.find({role_id: id});
    }

    async findOneRoleByName(name): Promise<Role[]> {
        return await this.roleRepository.find({name});
    }
}
