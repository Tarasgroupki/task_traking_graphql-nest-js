import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { User } from '../users/user.entity';
import { Client } from '../clients/client.entity';
import { Sprint } from '../sprints/sprint.entity';
import {NotificationHasLead} from '../notifications/notification_has_lead.entity';

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Sprint, sprint => sprint.lead)
    sprints: Sprint[];

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: number;

    @Column()
    user_assigned_id: number;

    @ManyToOne(type => User, user => user.leads)
    @JoinColumn({name: 'user_assigned_id'})
    user: User;

    // @ManyToOne(type => User, user => user.leads)
    // @JoinColumn({name: 'user_assigned_id', referencedColumnName: 'id'})
    // user: User;

    @Column()
    client_id: number;

    @ManyToOne(type => Client, client => client.leads)
    @JoinColumn({name: 'client_id'})
    client: Client;

    @OneToMany(type => NotificationHasLead, notification_has_lead => notification_has_lead.lead)
    notification_has_lead: NotificationHasLead[];

    @Column()
    user_created_id: number;

    @Column()
    contact_date: Date;
}
