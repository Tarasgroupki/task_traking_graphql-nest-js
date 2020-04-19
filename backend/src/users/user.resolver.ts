import {Args, Query, Resolver} from '@nestjs/graphql';
import {UsersService} from './users.service';
import { SetMetadata } from '@nestjs/common';

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Query()
    @SetMetadata('permissions', ['create users'])
    async users() {
        return await this.usersService.findAll();
    }

    @Query()
   // @SetMetadata('permissions', ['create users'])
    async user(@Args('id') id: number) {
        return await this.usersService.findOne({id});
    }
}
