import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {RoleHasPermission} from './role_has_permission.entity';
import {Role} from './role.entity';

@Injectable()
export class PermissionsService {

    constructor(@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
                //  private readonly roleHasPermissionRepository: Repository<RoleHasPermission>
    ) {
        // super(repo);
    }

    async findAll(): Promise<Permission[]> {
        return await this.permissionRepository.find();
    }

    async createPermission(permission: Permission): Promise<Permission> {
        return this.permissionRepository.save(permission);
    }

    // async createRoleHasPermission(role_has_permission: RoleHasPermission): Promise<RoleHasPermission> {
    //   return this.roleHasPermissionRepository.save(role_has_permission);
    //}

    async findOne(id): Promise<Permission[]> {
        return await this.permissionRepository.find({id: id});
    }

    async findPermsOfRole(array): Promise<Permission[]> {
        return await this.permissionRepository.createQueryBuilder()
            .where('id IN (:arr)', {arr: array })
            .getMany();
    }
    // async create(@Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    //  }
}
