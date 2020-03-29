import { Controller, Post, HttpStatus, HttpCode, Get, Response, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RolesService } from '../settings/roles.service';
import { PermissionsService } from '../settings/permissions.service';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly roleService: RolesService,
        private readonly permissionService: PermissionsService,
    ) {}

    @Post('login')
    async loginUser(@Response() res: any, @Body() body: User) {
        if (!(body && body[0].email && body[0].password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
        }

        const user = await this.userService.getUserByUsername(body[0].email);
        const UserHasRoles = await this.userService.findUserRoles(user.id);
        const RoleHasPermissions = await this.roleService.findOneRoleHasPermById(UserHasRoles[0].role_id);
        const perms = [];
        RoleHasPermissions.forEach((item) => {
            perms.push(item.permission_id);
        });
        const permissions = await this.permissionService.findPermsOfRole(perms);
        const PermissionNames = [];
        const PermissionSlugs = [];
        permissions.forEach((item) => {
            PermissionNames.push(item.name);
            PermissionSlugs.push(item.name.replace(' ', '-'));
        });

        if (user) {
            const token = await this.authService.login(user.id, user.email, PermissionNames);
            if (await this.userService.compareHash(body[0].password, user.passwordHash)) {
                return res.status(200).json({
                    message: 'Auth succesfull!',
                    user,
                    token: token.token,
                    roles: ['admin'],
                    permissions: PermissionSlugs,
                });
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or password wrong!' });
    }

    @Post('register')
    async registerUser(@Response() res: any, @Body() body: User) {
        if (!(body && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
        }

        let user = await this.userService.getUserByUsername(body.email);

        if (user) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username exists' });
        } else {
            user = await this.userService.createUser(body);
            if (user) {
                user.passwordHash = undefined;
            }
        }
        return user;
    }
}
