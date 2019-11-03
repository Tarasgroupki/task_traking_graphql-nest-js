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
        const user_has_roles = await this.userService.findUserRoles(user.id);
        const role_has_permissions = await this.roleService.findOneRoleHasPermById(user_has_roles[0].role_id);
        let perms = [];
        role_has_permissions.forEach((item) => {
            perms.push(item['permission_id']);
        });
        const permissions = await this.permissionService.findPermsOfRole(perms);
        let permission_names = [];
        let permission_slugs = [];
        permissions.forEach((item) => {
            permission_names.push(item['name']);
            permission_slugs.push(item['name'].replace(" ","-"));
        });
        //let permissions = [];

       //  const   role_has_permissions.map( client.graphql => client.graphql.permission_id  );


            // slect * from fff where id in ( 1,4,5,6 )
        //   const  f =  await  permissions.push(this.permissionService.find( { 'in':   } )   One(value.permission_id);


         //  .then((result) => {
         //       permissions.push(result[0].name);
                //console.log(result);
         //   }));
       // });

       //     await ddd()
   // await  dfd();

       // const fff = await Promise.all([]);

      //  console.log(role_has_permissions);
       // console.log(permissions);
        //console.log(user_has_roles);

        if (user) {
            const token = await this.authService.login(user.id, user.email, permission_names);
            if (await this.userService.compareHash(body[0].password, user.passwordHash)) {
                return res.status(200).json({
                    message: 'Auth succesfull!',
                    user: user,
                    token: token.token,
                    roles: ['admin'],
                    permissions: permission_slugs
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


       // if(false){
       //     throw  new E

        return user;
    }
}
