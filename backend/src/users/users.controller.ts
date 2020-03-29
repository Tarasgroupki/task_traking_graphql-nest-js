
import {Controller, Get, Post, Put, Delete, Header, Param, Response, Body, HttpStatus, SetMetadata} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Crud({
    model: {
        type: User,
    },
})
@Controller('users')
export class UsersController {
    constructor(public userService: UsersService) {}

    @Get()
    @SetMetadata('permissions', ['create clients'])
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @SetMetadata('permissions', ['create clients'])
    findOne(@Param() params): Promise<User[]> {
        return this.userService.findOne(params.id);
    }
}
