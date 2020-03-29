
import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { NotificationsDto } from './notifications.dto';
import { NotificationHasClientDto } from './notification_has_client.dto';
import { NotificationHasLeadDto } from './notification_has_lead.dto';
import { ClientsRO } from '../clients/clients.dto';
import { Notification } from './notification.entity';
import { NotificationHasClient } from './notification_has_client.entity';
import { NotificationHasLead } from './notification_has_lead.entity';
import { Repository } from 'typeorm';
import {SprintsService} from '../sprints/sprints.service';
import {Sprint} from '../sprints/sprint.entity';

@Injectable()
export class NotificationsService {
    constructor(@InjectRepository(Notification) private readonly notificationRepository: Repository<Notification>,
                @InjectRepository(NotificationHasClient) private readonly notificationHasClientRepository: Repository<NotificationHasClient>,
                @InjectRepository(NotificationHasLead) private readonly notificationHasLeadRepository: Repository<NotificationHasLead>) {
    }

    async findAll(): Promise<Notification[]> {
        return await this.notificationRepository.find({
            relations: ['user'],
        });
    }

    async findAllByUser(userId: any): Promise<Notification[]> {
        const idVal = userId.userId ? userId.userId : userId;

        return await this.notificationRepository.find({
            where: [{user_id: idVal}],
        });
    }

    async findAllByUserAndStatus(userId: any): Promise<Notification[]> {
        const idVal = userId.userId ? userId.userId : userId;

        return await this.notificationRepository.find({
            where: [{user_id: idVal, status: 0}],
            // relations: ['user']
        });
    }

    async UpdateStatus(userId: number) {
        const notification = await this.notificationRepository.find({user_id: userId});

        // for (let i = 0; i < notification.length; i++) {
        for (const value of notification) {
            value.status = 1;

            await this.notificationRepository.save(value);
        }

        return notification[0];
    }

    async findMax() {
        return await this.notificationRepository.createQueryBuilder()
            .select('MAX(id)', 'max')
            .getRawOne();
    }

    async findNotificationHasLead(array: any) {
       return await this.notificationHasLeadRepository.createQueryBuilder()
            .where('notification_id IN (:arr)', {arr: array })
            .getMany();
    }

    async findAllNotHasLead(id: number): Promise<NotificationHasLead[]> {
        const notifArr = await this.notificationHasLeadRepository.createQueryBuilder()
            .where('notification_id IN (:arr)', {arr: [6, 7, 8] })
            .getMany();
        console.log(notifArr);
        return await this.notificationHasLeadRepository.find({
            where: [{notification_id: id}],
        });
    }

    async createNotification(data: any): Promise<Notification> {
        const notification = new Notification();
        notification.name = data.name;
        notification.description = data.description;
        notification.status = data.status;
        notification.user_id = data.user;

        await this.notificationRepository.save(notification);

        return notification;
    }

    async createNotificationHasClient(data: NotificationHasClientDto): Promise<NotificationHasClient> {
        const notificationHasClient = new NotificationHasClient();

        notificationHasClient.notification_id = data.notification;
        notificationHasClient.client_id = data.client;

        await this.notificationHasClientRepository.save(notificationHasClient);

        return notificationHasClient;
    }

    async createNotificationHasLead(data: any): Promise<NotificationHasLead> {
        const notificationHasLead = new NotificationHasLead();

        notificationHasLead.notification_id = data.notification;
        notificationHasLead.lead_id = data.lead;

        await this.notificationHasLeadRepository.save(notificationHasLead);

        return notificationHasLead;
    }

    async delete(id: any) {
        const notificationHasLead = await this.notificationHasLeadRepository.find({notification_id: id.id});
        const notification = await this.notificationRepository.find({id: id.id});
        await this.notificationHasLeadRepository.remove(notificationHasLead[0]);
        await this.notificationRepository.remove(notification[0]);
        return true;
    }
}
