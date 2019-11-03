import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import {Lead} from '../leads/lead.entity';
import {Notification} from './notification.entity';

@Entity('notification_has_lead')
export class NotificationHasLead {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    notification_id: number;

    @ManyToOne(type => Notification, notification => notification.notification_has_client)
    @JoinColumn({name: 'notification_id'})
    notification: Notification;

    @Column()
    lead_id: number;

    @ManyToOne(type => Lead, lead => lead.notification_has_lead)
    @JoinColumn({name: 'lead_id'})
    lead: Lead;
}
