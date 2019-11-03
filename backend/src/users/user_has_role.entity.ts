
import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import {User} from './user.entity';
import {Role} from '../settings/role.entity';

@Entity('user_has_role')
export class UserHasRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_id: number;

    @ManyToOne(type => Role, role => role.user_has_role)
    @JoinColumn({name: 'role_id'})
    roles: Role;

    @Column()
    user_id: number;

    @ManyToOne(type => User, user => user.user_has_roles)
    @JoinColumn({name: 'user_id'})
    users: User;
}
