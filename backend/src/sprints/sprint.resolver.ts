import { Query, Resolver, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { SprintsService } from './sprints.service';
import { LeadsService } from '../leads/leads.service';
import { UsersService } from '../users/users.service';

@Resolver('Sprint')
export class SprintResolver {
    constructor(
        private readonly sprintsService: SprintsService,
        private readonly leadsService: LeadsService,
        private readonly usersService: UsersService
    ) {}

    @Query()
    async sprints() {
        return await this.sprintsService.findAll();
    }

    @ResolveProperty()
    async lead(@Parent() sprint) {
        const id = sprint.lead_assigned_id;
        return await this.leadsService.showBySprint(id);
    }

    @ResolveProperty()
    async user(@Parent() lead) {
        const id = lead.user_created_id;
        return await this.usersService.showByLead(id);
    }

    @Query()
    async sprint(@Args('id') id: number) {
        return await this.sprintsService.findOne({id});
    }
}
