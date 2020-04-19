import { Query, Resolver, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import {SprintsService} from '../sprints/sprints.service';
import {UsersService} from '../users/users.service';
import { SetMetadata } from '@nestjs/common';

@Resolver('Task')
export class TaskResolver {
    constructor(
        private readonly tasksService: TasksService,
        private readonly sprintsService: SprintsService,
        private readonly usersService: UsersService,
    ) {}

    @Query()
    @SetMetadata('permissions', ['create tasks'])
    async tasks() {
        return await this.tasksService.findAll();
    }

    @ResolveProperty()
    async sprint(@Parent() task) {
        const id = task.sprint_assigned_id;
        return await this.sprintsService.showByTask(id);
    }

    @ResolveProperty()
    async user(@Parent() task) {
        const id = task.user_created_id;
        return await this.usersService.showByLead(id);
    }

    @Query()
    @SetMetadata('permissions', ['create tasks'])
    async task(@Args('id') id: number) {
        return await this.tasksService.findOne({id});
    }
}
