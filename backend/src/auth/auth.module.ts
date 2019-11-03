import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewareConsumer,
    RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../settings/roles.module';
import { PermissionsModule } from '../settings/permissions.module';
import { AuthController } from './auth.controller';

@Module({
    imports: [UsersModule, RolesModule, PermissionsModule],
    providers: [AuthService, JwtStrategy, AuthResolver],
    controllers: [AuthController],
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(
                { path: '/clients', method: RequestMethod.ALL },
                { path: '/clients/*', method: RequestMethod.ALL },
                { path: '/tasks', method: RequestMethod.ALL },
                { path: '/tasks/*', method: RequestMethod.ALL },
                { path: '/sprints', method: RequestMethod.ALL },
                { path: '/sprints/*', method: RequestMethod.ALL },
                { path: '/leads', method: RequestMethod.ALL },
                { path: '/leads/*', method: RequestMethod.ALL });
    }
}
