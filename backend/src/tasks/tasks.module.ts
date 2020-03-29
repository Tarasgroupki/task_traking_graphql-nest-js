
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './task.entity';
import { Role } from '../settings/role.entity';
import { TasksService } from './tasks.service';
import { TaskResolver } from './task.resolver';
import { TasksController } from './tasks.controller';
import { Sprint } from '../sprints/sprint.entity';
import { SprintsService } from '../sprints/sprints.service';
import {User} from '../users/user.entity';
import {UserHasRole} from '../users/user_has_role.entity';
import {UsersService} from '../users/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Task, Sprint, User, UserHasRole])],
    providers: [TasksService, TaskResolver, SprintsService, UsersService],
    controllers: [TasksController],
})
export class TasksModule {}
