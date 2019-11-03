
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

        // super(repo);
    }

    /* private leadToResponceObject(lead: Lead): LeadsRO {
         const responceObject: any = {
             ...lead,
             client: lead.client,
         }
     }*/

  /*
async findOne(id): Promise<Notification[]> {
        const notification = await this.notificationRepository.find({id: id.id});
        // console.log(lead);
        return notification;
    }
    */

    async findAll(): Promise<Notification[]> {
        return await this.notificationRepository.find({
            relations: ['user']
        });
    }

    async findAllByUser(userId: any): Promise<Notification[]> {
        const id_val = userId.userId ? userId.userId : userId;

        return await this.notificationRepository.find({
            where: [{user_id: id_val}],
            // relations: ['user']
        });
    }

    async findAllByUserAndStatus(userId: any): Promise<Notification[]> {
        const id_val = userId.userId ? userId.userId : userId;

        return await this.notificationRepository.find({
            where: [{user_id: id_val, status: 0}],
            // relations: ['user']
        });
    }

    async UpdateStatus(userId: number) {
        const notification = await this.notificationRepository.find({user_id: userId});

        for (let i = 0; i < notification.length; i++) {
            notification[i].status = 1;

            await this.notificationRepository.save(notification[i]);
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
        const notif_arr = await this.notificationHasLeadRepository.createQueryBuilder()
            .where('notification_id IN (:arr)', {arr: [6, 7, 8] })
            .getMany();
        console.log(notif_arr);
        return await this.notificationHasLeadRepository.find({
            where: [{notification_id: id}]
        });
    }

    async createNotification(data: any): Promise<Notification> {
        const notification = new Notification();
       // const notification_has_client = new Notifica
        console.log(data);
        notification.name = data.name;
        notification.description = data.description;
        notification.status = data.status;
        notification.user_id = data.user;

        await this.notificationRepository.save(notification);

        return notification;
    }

    async createNotificationHasClient(data: NotificationHasClientDto): Promise<NotificationHasClient> {
        const notification_has_client = new NotificationHasClient();

        notification_has_client.notification_id = data.notification;
        notification_has_client.client_id = data.client;

        await this.notificationHasClientRepository.save(notification_has_client);

        return notification_has_client;
    }

    async createNotificationHasLead(data: any): Promise<NotificationHasLead> {
        const notification_has_lead = new NotificationHasLead();

        notification_has_lead.notification_id = data.notification;
        notification_has_lead.lead_id = data.lead;

        await this.notificationHasLeadRepository.save(notification_has_lead);

        return notification_has_lead;
    }

    async delete(id: any) {
        console.log(id);
        const notificationHasLead = await this.notificationHasLeadRepository.find({notification_id: id.id});
        const notification = await this.notificationRepository.find({id: id.id});
        //const
       // console.log(notification[0]);
       // console.log(notificationHasLead[0]);
        await this.notificationHasLeadRepository.remove(notificationHasLead[0]);
        await this.notificationRepository.remove(notification[0]);
        return true;
    }
}
