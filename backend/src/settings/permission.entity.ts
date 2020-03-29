import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {RoleHasPermission} from './role_has_permission.entity';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => RoleHasPermission, role_has_permissions => role_has_permissions.permissions)
    role_has_permissions: RoleHasPermission[];

    @Column()
    name: string;
}
