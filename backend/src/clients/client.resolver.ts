import { Query, Mutation, Resolver, Args, ResolveProperty, Parent} from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { UsersService } from '../users/users.service';
import {ClientsDto} from './clients.dto';
import { Client } from './client.entity';
//import { GraphqlAuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../settings/permissions.guard';
import {SetMetadata, UseGuards} from '@nestjs/common';

@Resolver('Client')
export class ClientResolver {
    constructor(
        private readonly clientsService: ClientsService,
        private readonly usersService: UsersService
    ) {}

    @Query()
    @SetMetadata('permissions', ['create tasks'])
    async clients() {
        return await this.clientsService.findAll();
    }

    @Query()
    @SetMetadata('permissions', ['create tasks'])
    async client(@Args('id') id: number) {
        return await this.clientsService.findOne({id});
    }

    @ResolveProperty()
    async user(@Parent() client) {
        const id = client.user_id;
        return await this.usersService.showByClient(id);
    }

    @Mutation(() => ClientsDto)
    @SetMetadata('permissions', ['create tasks'])
    createClient( @Args('client') client: any ): Promise<Client> {
        return this.clientsService.createClient(client);
    }

    @Mutation(() => ClientsDto)
    @SetMetadata('permissions', ['edit tasks'])
    async updateClient(@Args('client') client: any): Promise<Client> {
        // console.log(id);
        return this.clientsService.update(client);
    }

    @Mutation()
    @SetMetadata('permissions', ['delete tasks'])
    async deleteClient(@Args('id') id: number): Promise<boolean> {
       // console.log(id);
        return this.clientsService.delete(id);
    }

    @Mutation()
    @SetMetadata('permissions', ['delete tasks'])
    async deleteClients(@Args('arr_id') arr_id: any): Promise<boolean> {
        // console.log(id);
        return this.clientsService.deleteAll(arr_id);
    }
}
