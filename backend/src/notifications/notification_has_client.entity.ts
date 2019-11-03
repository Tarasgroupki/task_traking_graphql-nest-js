import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import {Client} from '../clients/client.entity';
import {Notification} from './notification.entity';

@Entity('notification_has_client')
export class NotificationHasClient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    notification_id: number;

    @ManyToOne(type => Notification, notification => notification.notification_has_client)
    @JoinColumn({name: 'notification_id'})
    notification: Notification;

    @Column()
    client_id: number;

    @ManyToOne(type => Client, client => client.notification_has_client)
    @JoinColumn({name: 'client_id'})
    client: Client;
}
