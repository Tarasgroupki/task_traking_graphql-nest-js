import {Args, Query, Resolver} from '@nestjs/graphql';
import {UsersService} from './users.service';

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Query()
    async users() {
        return await this.usersService.findAll();
    }

    @Query()
    async user(@Args('id') id: number) {
        return await this.usersService.findOne({id});
    }
}
