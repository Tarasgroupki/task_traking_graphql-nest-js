
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert} from 'typeorm';
import { Client } from '../clients/client.entity';
import { Lead } from '../leads/lead.entity';
import { Sprint } from '../sprints/sprint.entity';
import { Task } from '../tasks/task.entity';
import { UserHasRole } from './user_has_role.entity';
import { Notification } from '../notifications/notification.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Client, client => client.user)
    clients: Client[];
    @OneToMany(type => Lead, lead => lead.user)
    leads: Lead[];
    @OneToMany(type => Sprint, sprint => sprint.user)
    sprints: Sprint[];
    @OneToMany(type => Task, task => task.user)
    tasks: Task[];
    @OneToMany(type => UserHasRole, user_has_role => user_has_role.users)
    user_has_roles: Task[];
    @OneToMany(type => Notification, notifications => notifications.user)
    notifications: Notification[];

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ length: 100, nullable: true })
    password: string|undefined;

    @Column({ length: 100, nullable: true })
    passwordHash: string|undefined;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    @Column()
    address: string;

    @Column()
    work_number: string;

    @Column()
    personal_number: string;

    @Column()
    image_path: string;
}
