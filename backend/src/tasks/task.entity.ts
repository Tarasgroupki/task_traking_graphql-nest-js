import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';
import { User } from '../users/user.entity';
import { Sprint } from '../sprints/sprint.entity';
import { Client } from '../clients/client.entity';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: number;

    @Column()
    user_assigned_id: number;

    @ManyToOne(type => User, user => user.tasks)
    @JoinColumn({name: 'user_created_id', referencedColumnName: 'id'})
    user: User;

    // @ManyToOne(type => User, user => user.tasks)
    // @JoinColumn({name: 'user_assigned_id', referencedColumnName: 'id'})

    @Column()
    sprint_assigned_id: number;

    @ManyToOne(type => Sprint, sprint => sprint.tasks)
    @JoinColumn({name: 'sprint_assigned_id'})
    sprint: Sprint;

    @Column()
    user_created_id: number;

    @Column()
    deadline: string;
}
