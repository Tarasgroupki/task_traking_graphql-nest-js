import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../settings/roles.service';
import { PermissionsService } from '../settings/permissions.service';
import { AuthDto } from './auth.dto';
import {HttpStatus, HttpException, Response, Body} from '@nestjs/common';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly roleService: RolesService,
        private readonly permissionService: PermissionsService,
    ) {}

    @Mutation(() => AuthDto)
    async login(
        @Args('auth') auth: any,
    ) {
        if (!(auth.email && auth.password)) {
            return new HttpException(
                'Invalid username/password',
                HttpStatus.FORBIDDEN,
            );
        }
        const user = await this.userService.getUserByUsername(auth.email);
        const userHasRoles = await this.userService.findUserRoles(user.id);
        const roleHasPermissions = await this.roleService.findOneRoleHasPermById(userHasRoles[0].role_id);
        const roles = await this.userService.getRoles(user.id);
        const perms = [];
        roleHasPermissions.forEach((item) => {
            perms.push(item.permission_id);
        });
        const permissions = await this.permissionService.findPermsOfRole(perms);
        const rolesArr = [];
        const permissionNames = [];
        const permissionSlugs = [];
        roles.forEach((item) => {
            rolesArr.push(item.name);
        });
        permissions.forEach((item) => {
            permissionNames.push(item.name);
            permissionSlugs.push(item.name.replace(' ', '-'));
        });
        if (user) {
            const token = await this.authService.login(user.id, user.email, permissionNames);
            if (await this.userService.compareHash(auth.password, user.passwordHash)) {
                return {
                    message: 'Auth succesfull!',
                    user,
                    token: token.token,
                    roles: rolesArr,
                    permissions: permissionSlugs,
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
