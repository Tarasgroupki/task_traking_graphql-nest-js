import { Query, Mutation, Resolver, Args, ResolveProperty, Parent} from '@nestjs/graphql';
import { RolesService } from './roles.service';
//import { UsersService } from '../users/users.service';
//import { GraphqlAuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../settings/permissions.guard';
import {SetMetadata, UseGuards} from '@nestjs/common';
import {LeadsDto} from '../leads/leads.dto';
import {Role} from './role.entity';

@Resolver('Role')
export class RoleResolver {
    constructor(
        private readonly rolesService: RolesService,
    //    private readonly usersService: UsersService
    ) {}

    @Query()
    async roles() {
        console.log(await this.rolesService.findAll());
        return await this.rolesService.findAll();
    }

    @Query()
    async permissions() {
        console.log(await this.rolesService.findAllPerms());
        return await this.rolesService.findAllPerms();
    }

    @Query()
    async role(@Args('id') id: number) {
        console.log(id);
        return await this.rolesService.findOne({id});
    }

    @Query()
    async roleHasPermission(@Args('role_id') role_id: number) {
        console.log('Role', role_id);
        return await this.rolesService.findOneRoleHasPermById(role_id);
    }

    @Query()
    async roleByName(@Args('name') name: string) {
        console.log(name);
        return await this.rolesService.findOneRoleByName({name});
    }

    @Query()
    async permission(@Args('id') id: number) {
        console.log(id);
        return await this.rolesService.findOnePerm({id});
    }

    @Mutation(() => LeadsDto)
    async createRole( @Args('role') role: any ): Promise<Role> {

        return this.rolesService.createRole(role);
    }
}
