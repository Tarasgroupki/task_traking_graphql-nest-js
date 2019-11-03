
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { User } from '../users/user.entity';
import { Lead } from '../leads/lead.entity';
import { Task } from '../tasks/task.entity';

@Entity('sprints')
export class Sprint {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: number;

    @Column()
    lead_assigned_id: number;

    @ManyToOne(type => Lead, lead => lead.sprints)
    @JoinColumn({name: 'lead_assigned_id'})
    lead: Lead;

    @OneToMany(type => Task, task => task.sprint)
    tasks: Task[];

    @Column()
    user_created_id: number;

    @ManyToOne(type => User, user => user.sprints)
    @JoinColumn({name: 'user_created_id'})
    user: User;

    @Column()
    deadline: string;
}
