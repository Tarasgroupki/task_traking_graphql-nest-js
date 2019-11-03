import { Query, Resolver, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver('User')
export class UserResolver {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Query()
    async users() {
        const users = await this.usersService.findAll();
        console.log(users);
        return users;
    }

    @Query()
    async user(@Args('id') id: number) {
        const user = await this.usersService.findOne({id});
        console.log(user);
        return user;
    }
}
