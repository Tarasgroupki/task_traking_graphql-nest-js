
import {Controller, Get, Post, Put, Delete, Header, Param, Response, Body, HttpStatus} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Role } from './role.entity';
import { RolesService } from './roles.service';
import {RoleHasPermission} from './role_has_permission.entity';

@Crud({
    model: {
        type: Role,
    },
})
@Controller('roles')
export class RolesController {
    constructor(public roleService: RolesService) {}

    @Get()
    findAll(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<Role[]> {
        return this.roleService.findOne(params.id);
    }

    @Get('/role_has_permission/:id')
    findOneRoleHasPermById(@Param() params): Promise<RoleHasPermission[]> {
        return this.roleService.findOneRoleHasPermById(params.id);
    }

    @Get(':name')
    findOneRoleByName(@Param() params): Promise<Role[]> {
        return this.roleService.findOneRoleByName(params.name);
    }

    @Post()
    @Header('Cache-Control', 'none')
    create(role: Role): Promise<Role> {
        return this.roleService.createRole(role);
    }

    @Post('role_has_permissions')
    @Header('Cache-Control', 'none')
    create_roleHasPerm(roleHasPermissions: RoleHasPermission): Promise<RoleHasPermission> {
        return this.roleService.createRoleHasPermissions(roleHasPermissions);
    }
}
