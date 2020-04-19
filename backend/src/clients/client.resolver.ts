import { Query, Mutation, Resolver, Args, ResolveProperty, Parent} from '@nestjs/graphql';
import { ClientsService } from './clients.service';
import { UsersService } from '../users/users.service';
import {ClientsDto} from './clients.dto';
import { Client } from './client.entity';
import {SetMetadata, UseGuards} from '@nestjs/common';

@Resolver('Client')
export class ClientResolver {
    constructor(
        private readonly clientsService: ClientsService,
        private readonly usersService: UsersService,
    ) {}

    @Query()
    @SetMetadata('permissions', ['create clients'])
    async clients() {
        return await this.clientsService.findAll();
    }

    @Query()
    @SetMetadata('permissions', ['create clients'])
    async client(@Args('id') id: number) {
        return await this.clientsService.findOne({id});
    }

    @ResolveProperty()
    async user(@Parent() client) {
        const id = client.user_id;
        return await this.usersService.showByClient(id);
    }

    @Mutation(() => ClientsDto)
    @SetMetadata('permissions', ['create clients'])
    createClient( @Args('client') client: any ): Promise<Client> {
        return this.clientsService.createClient(client);
    }

    @Mutation(() => ClientsDto)
    @SetMetadata('permissions', ['edit clients'])
    async updateClient(@Args('client') client: any): Promise<Client> {
        return this.clientsService.update(client);
    }

    @Mutation()
    @SetMetadata('permissions', ['delete clients'])
    async deleteClient(@Args('id') id: number): Promise<boolean> {
        return this.clientsService.delete(id);
    }

    @Mutation()
    @SetMetadata('permissions', ['delete clients'])
    async deleteClients(@Args('arrId') arrId: any): Promise<boolean> {
        return this.clientsService.deleteAll(arrId);
    }
}
