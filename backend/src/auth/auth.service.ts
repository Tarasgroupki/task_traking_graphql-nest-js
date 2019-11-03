import * as jwt from 'jsonwebtoken';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

   /* async login(data: AuthDto) {
        const { email, password } = data;
        const user = await this.userService.getUserByUsername( email );
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException(
                'Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject();
    }*/
    async login(id: number, email: string, permissions: any) {
        const expiresIn = 60 * 60;
        const secretOrKey = '432432423324';
        const user = { email, permissions: permissions };
        const token = jwt.sign(user, secretOrKey, { expiresIn });

        return { expires_in: expiresIn, token };
    }

    async validateUser(signedUser): Promise<boolean> {
        if (signedUser && signedUser.email) {
            return Boolean(this.userService.getUserByUsername(signedUser.email));
        }

        return false;
    }
}
