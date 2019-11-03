
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserHasRole } from './user_has_role.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserResolver } from './user.resolver';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from '../settings/permissions.guard';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserHasRole])],
    providers: [UsersService, {
        provide: APP_GUARD,
        useClass: PermissionsGuard,
    }, UserResolver],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
