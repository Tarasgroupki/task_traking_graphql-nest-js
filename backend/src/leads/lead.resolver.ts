import {Args, Mutation, Parent, Query, ResolveProperty, Resolver, Subscription} from '@nestjs/graphql';
import {Lead} from './lead.entity';
import {LeadsDto} from './leads.dto';
import {LeadsService} from './leads.service';
import {ClientsService} from '../clients/clients.service';
import {UsersService} from '../users/users.service';
import {NotificationsService} from '../notifications/notifications.service';
import {Inject} from '@nestjs/common';
import {PubSubEngine} from 'graphql-subscriptions';

// import { InputLead } from './lead.input';

@Resolver('Lead')
export class LeadResolver {
    constructor(
        private readonly leadsService: LeadsService,
        private readonly clientsService: ClientsService,
        private readonly usersServise: UsersService,
        private readonly notificationsService: NotificationsService,
        @Inject('PUB_SUB') private pubSub: PubSubEngine,
    ) {}

    @Query()
    async leads() {
        return await this.leadsService.findAll();
    }

    @Query()
    async lead(@Args('id') id: number) {
        return await this.leadsService.findOne({id});
    }

    @ResolveProperty()
    async client(@Parent() lead) {
        const id = lead.client_id;
        return await this.clientsService.showByLead(id);
    }

    @ResolveProperty()
    async user(@Parent() lead) {
        const id = lead.user_created_id;
        return await this.usersServise.showByLead(id);
    }

    @Mutation(() => LeadsDto)
    async createLead( @Args('lead') lead: any ): Promise<Lead> {
        await this.notificationsService.createNotification({name: 'Lead notification', description: 'You were added to the new lead', status: 0, user: lead.user_assigned});
        const leads = await this.leadsService.findOneByName(lead.title);
        const notifications = await this.notificationsService.findMax();
        this.notificationsService.createNotificationHasLead({notification: notifications.max, lead: leads[0].id});
        return this.leadsService.createLead(lead);
    }

    @Mutation(() => LeadsDto)
    async updateLead(@Args('lead') lead: any): Promise<Lead> {
        await this.notificationsService.createNotification({name: 'Lead notification', description: 'You were added to the new lead', status: 0, user: lead.user_assigned});
        const notifications = await this.notificationsService.findMax();
        this.notificationsService.createNotificationHasLead({notification: notifications.max, lead: lead.id});
        this.pubSub.publish('notificationAdded', { ['notificationAdded']: lead });
        return this.leadsService.update(lead);
    }

    @Mutation()
    async deleteLead(@Args('id') id: number): Promise<boolean> {
        return this.leadsService.delete(id);
    }

    @Mutation()
    //  @SetMetadata('permissions', ['delete tasks'])
    async deleteLeads(@Args('arr_id') arrId: any): Promise<boolean> {
         return await this.leadsService.deleteAll(arrId);
    }

    @Subscription()
    notificationAdded() {
        return this.pubSub.asyncIterator('notificationAdded');
    }
}
