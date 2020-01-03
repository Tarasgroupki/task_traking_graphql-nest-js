
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Lead } from './lead.entity';
import { LeadsService } from './leads.service';
import { LeadResolver } from './lead.resolver';
import { LeadsController } from './leads.controller';
import {ClientsService} from '../clients/clients.service';
import {Client} from '../clients/client.entity';
import {UsersService} from '../users/users.service';
import {User} from '../users/user.entity';
import {UserHasRole} from '../users/user_has_role.entity';
import {NotificationsService} from '../notifications/notifications.service';
import { Notification } from '../notifications/notification.entity';
import { NotificationHasLead } from '../notifications/notification_has_lead.entity';
import { NotificationHasClient } from '../notifications/notification_has_client.entity';

import { DateScalar } from '../date.scalar';
import {NotificationResolver} from '../notifications/notification.resolver';
import {PubSub} from 'graphql-subscriptions';
import {Role} from '../settings/role.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Lead, Client, User, UserHasRole, Notification, NotificationHasLead, NotificationHasClient])],
    providers: [LeadsService, LeadResolver, ClientsService, UsersService, NotificationsService, DateScalar, {
        provide: 'PUB_SUB',
        useValue: new PubSub(),
    }],
    controllers: [LeadsController],
})
export class LeadsModule {}
