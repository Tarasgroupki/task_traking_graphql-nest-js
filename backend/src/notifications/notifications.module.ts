
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationResolver } from './notification.resolver';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { NotificationHasClient } from './notification_has_client.entity';
import { NotificationHasLead } from './notification_has_lead.entity';
import {LeadsService} from '../leads/leads.service';
import {Lead} from '../leads/lead.entity';
import { PubSub } from 'graphql-subscriptions';

@Module({
    imports: [TypeOrmModule.forFeature([Notification, NotificationHasClient, NotificationHasLead, Lead])],
    providers: [NotificationsService, LeadsService, NotificationResolver, {
        provide: 'PUB_SUB',
        useValue: new PubSub(),
    }],
    controllers: [],
    exports: [NotificationsService],
})
export class NotificationsModule {}
