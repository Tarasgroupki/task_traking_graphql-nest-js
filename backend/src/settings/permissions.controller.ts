
import {Controller, Get, Post, Put, Delete, Header, Param, Response, Body, HttpStatus} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Role } from './role.entity';
import { PermissionsService } from './permissions.service';
import {Permission} from './permission.entity';

@Crud({
    model: {
        type: Permission,
    },
})
@Controller('permissions')
export class PermissionsController {
    constructor(public permissionService: PermissionsService) {}

    @Get()
    findAll(): Promise<Permission[]> {
        return this.permissionService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<Permission[]> {
      //  console.log(params.id);
        return this.permissionService.findOne(params.id);
    }

    @Post()
    @Header('Cache-Control', 'none')
    create(permission: Permission): Promise<Permission> {
        return this.permissionService.createPermission(permission);
    }
}
