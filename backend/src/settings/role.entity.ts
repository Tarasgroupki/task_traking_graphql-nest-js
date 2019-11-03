
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Client} from '../clients/client.entity';
import {RoleHasPermission} from './role_has_permission.entity';
import {UserHasRole} from '../users/user_has_role.entity';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => RoleHasPermission, role_has_permissions => role_has_permissions.roles)
    role_has_permissions: RoleHasPermission[];

    @OneToMany(type => UserHasRole, user_has_role => user_has_role.roles)
    user_has_role: UserHasRole[];

    @Column()
    name: string;
}
