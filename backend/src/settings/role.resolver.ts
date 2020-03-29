import { Query, Mutation, Resolver, Args, ResolveProperty, Parent} from '@nestjs/graphql';
import { RolesService } from './roles.service';
import {LeadsDto} from '../leads/leads.dto';
import {Role} from './role.entity';

@Resolver('Role')
export class RoleResolver {
    constructor(
        private readonly rolesService: RolesService,
    ) {}

    @Query()
    async roles() {
        return await this.rolesService.findAll();
    }

    @Query()
    async permissions() {
        return await this.rolesService.findAllPerms();
    }

    @Query()
    async role(@Args('id') id: number) {
        return await this.rolesService.findOne({id});
    }

    @Query()
    async roleHasPermission(@Args('role_id') roleId: number) {
        return await this.rolesService.findOneRoleHasPermById(roleId);
    }

    @Query()
    async roleByName(@Args('name') name: string) {
        return await this.rolesService.findOneRoleByName({name});
    }

    @Query()
    async permission(@Args('id') id: number) {
        return await this.rolesService.findOnePerm({id});
    }

    @Mutation(() => LeadsDto)
    async createRole( @Args('role') role: any ): Promise<Role> {
        return this.rolesService.createRole(role);
    }
}
