import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {NotificationsService} from './notifications.service';
import {LeadsService} from '../leads/leads.service';

@Resolver('Notification')
export class NotificationResolver {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly leadsService: LeadsService,
    ) {}

    @Query()
    async notificationHasLead(@Args('id') id: number) {
        const notification = await this.notificationsService.findAllByUser(id);
        const ids = [];
       // for(let i = 0; i < notification.length; i++) {
        for (const value of notification) {
            ids.push(value.id);
        }
       // console.log(ids);
        const lead = await this.notificationsService.findNotificationHasLead(ids);
        ids.length = 0;
       // for(let i = 0; i < lead.length; i++) {
        for (const value of lead) {
            ids.push({id: value.lead_id});
        }
        return ids;
    }

    @Query()
    async notifications() {
        return await this.notificationsService.findAll();
    }

    @Query()
    async notificationsByUserAndStatus(@Args('userId') userId: number) {
        return await this.notificationsService.findAllByUserAndStatus(userId);
    }

    @Mutation()
    async deleteNotification(@Args('id') id: number): Promise<boolean> {
        return this.notificationsService.delete(id);
    }
}
