
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sprint } from './sprint.entity';
import { Role } from '../settings/role.entity';
import { SprintsService } from './sprints.service';
import { SprintResolver } from './sprint.resolver';
import { SprintsController } from './sprints.controller';
import {Lead} from '../leads/lead.entity';
import {UserResolver} from '../users/user.resolver';
import {UsersService} from '../users/users.service';
import {LeadsService} from '../leads/leads.service';
import {User} from '../users/user.entity';
import {UserHasRole} from '../users/user_has_role.entity';
import {ClientsService} from '../clients/clients.service';
import {APP_GUARD} from '@nestjs/core';
import {PermissionsGuard} from '../settings/permissions.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Sprint, Lead, User, UserHasRole])],
    providers: [SprintsService, {
        provide: APP_GUARD,
        useClass: PermissionsGuard,
    }, SprintResolver, UserResolver, UsersService, LeadsService,
        ],
    controllers: [SprintsController],
})
export class SprintsModule {}
