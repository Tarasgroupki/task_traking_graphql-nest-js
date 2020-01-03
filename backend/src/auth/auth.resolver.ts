import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../settings/roles.service';
import { PermissionsService } from '../settings/permissions.service';
import { AuthDto } from './auth.dto';
import {HttpStatus, HttpException, Response, Body} from '@nestjs/common';
import {Role} from '../settings/role.entity';
import {User} from '../users/user.entity';
import {ClientsDto} from '../clients/clients.dto';
//import { Client } from './client.entity';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly roleService: RolesService,
        private readonly permissionService: PermissionsService
    ) {}

    @Mutation(() => AuthDto)
    async login(
        @Args('auth') auth: any
    ) {
        // console.log(auth);
        if (!(auth.email && auth.password)) {
            return new HttpException(
                'Invalid username/password',
                HttpStatus.FORBIDDEN,
            );
        }
        console.log(auth.email);
        const user = await this.userService.getUserByUsername(auth.email);
        const user_has_roles = await this.userService.findUserRoles(user.id);
        const role_has_permissions = await this.roleService.findOneRoleHasPermById(user_has_roles[0].role_id);
        const roles = await this.userService.getRoles(user.id);
        let perms = [];
        role_has_permissions.forEach((item) => {
            perms.push(item['permission_id']);
        });
        const permissions = await this.permissionService.findPermsOfRole(perms);
        let roles_arr = [];
        let permission_names = [];
        let permission_slugs = [];
        roles.forEach((item) => {
            roles_arr.push(item['name']);
        });
        permissions.forEach((item) => {
            permission_names.push(item['name']);
            permission_slugs.push(item['name'].replace(" ","-"));
        });
        if (user) {
            const token = await this.authService.login(user.id, user.email, permission_names);
            if (await this.userService.compareHash(auth.password, user.passwordHash)) {
                return {
                    message: 'Auth succesfull!',
                    user: user,
                    token: token.token,
                    roles: roles_arr,
                    permissions: permission_slugs
                };
            }
        }

        return new HttpException(
            'Invalid username/password',
            HttpStatus.FORBIDDEN,
        );
    }

    @Mutation()
    async register(@Args('auth') auth: any) {
        if (!(auth && auth.email && auth.password)) {
            return new HttpException(
                'Invalid username/password',
                HttpStatus.FORBIDDEN,
            );
        }

        let user = await this.userService.getUserByUsername(auth.email);

        if (user) {
            return new HttpException(
                'Invalid username/password',
                HttpStatus.FORBIDDEN,
            );
        } else {
            user = await this.userService.createUser(auth);
            if (user) {
                user.passwordHash = undefined;
            }
        }

        return user;
    }

}
