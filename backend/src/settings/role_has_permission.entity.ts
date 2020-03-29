import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import {Lead} from '../leads/lead.entity';
import {Role} from './role.entity';
import {Permission} from './permission.entity';

@Entity('role_has_permissions')
export class RoleHasPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role_id: number;

    @ManyToOne(type => Role, role => role.role_has_permissions)
    @JoinColumn({name: 'role_id'})
    roles: Role;

    @Column()
    permission_id: number;

    @ManyToOne(type => Permission, permission => permission.role_has_permissions)
    @JoinColumn({name: 'permission_id'})
    permissions: Permission;
}
