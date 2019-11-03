import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Lead } from '../leads/lead.entity';
import { Task } from '../tasks/task.entity';
import {Client} from '../clients/client.entity';
import {NotificationHasClient} from './notification_has_client.entity';

@Entity('notifications')
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => NotificationHasClient, notification_has_client => notification_has_client.notification)
    notification_has_client: NotificationHasClient[];

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    status: number;

    @Column()
    user_id: number;

    @ManyToOne(type => User, user => user.notifications)
    @JoinColumn({name: 'user_id'})
    user: User;
}
