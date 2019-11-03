import { Query, Mutation, Subscription, Resolver, Args, ResolveProperty, Parent } from '@nestjs/graphql';
import {NotificationsService} from './notifications.service';
import {LeadsService} from '../leads/leads.service';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';
//import {Pu}

// const pubSub = new PubSub();

@Resolver('Notification')
export class NotificationResolver {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly leadsService: LeadsService
    ) {}

    @Query()
    async notificationHasLead(@Args('id') id: number) {
        const notification = await this.notificationsService.findAllByUser(id);
        let ids = [];
        for(let i = 0; i < notification.length; i++) {
            ids.push(notification[i].id);
        }
       // console.log(ids);
        const lead = await this.notificationsService.findNotificationHasLead(ids);
        ids.length = 0;
        for(let i = 0; i < lead.length; i++) {
            ids.push({id: lead[i].lead_id});
        }
        //console.log(ids);
        return ids;
    }

    @Query()
    async notifications() {
       // const notifications = await this.notificationsService.findAll();
      //  console.log(notifications);
        //console.log(await this.leadsService.findAll());
        return await this.notificationsService.findAll();
    }

    @Query()
    async notificationsByUserAndStatus(@Args('userId') userId: number) {
        const notification = await this.notificationsService.findAllByUserAndStatus(userId);

        return notification;
    }

    @Mutation()
    async deleteNotification(@Args('id') id: number): Promise<boolean> {
        //console.log(id);
        //this.pubSub.publish('notificationAdded', { ['notificationAdded']: { id } });
        return this.notificationsService.delete(id);
    }
}
