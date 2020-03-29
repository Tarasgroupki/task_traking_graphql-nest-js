
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { PermissionsGuard } from '../settings/permissions.guard';
import { Client } from './client.entity';
import { Role } from '../settings/role.entity';
import { ClientsService } from './clients.service';
import { UsersService } from '../users/users.service';
import { ClientResolver } from './client.resolver';
import { ClientsController } from './clients.controller';
import {User} from '../users/user.entity';
import {UserHasRole} from '../users/user_has_role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Client, User, UserHasRole])],
    providers: [ClientsService,
        {
            provide: APP_GUARD,
            useClass: PermissionsGuard,
        }
        , ClientResolver, UsersService],
    controllers: [ClientsController],
})
export class ClientsModule {}
