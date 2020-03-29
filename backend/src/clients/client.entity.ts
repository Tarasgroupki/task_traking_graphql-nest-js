import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Lead } from '../leads/lead.entity';
import {NotificationHasClient} from '../notifications/notification_has_client.entity';

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    primary_number: string;

    @Column()
    secondary_number: string;

    @Column()
    address: string;

    @Column()
    zipcode: string;

    @Column()
    city: string;

    @Column()
    company_name: string;

    @Column()
    vat: string;

    @Column()
    company_type: string;

    @Column()
    user_id: number;

    @ManyToOne(type => User, user => user.clients)
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToMany(type => Lead, lead => lead.client)
    leads: Lead[];

    @OneToMany(type => NotificationHasClient, notification_has_client => notification_has_client.client)
    notification_has_client: NotificationHasClient[];

    @Column()
    industry_id: number;
}
