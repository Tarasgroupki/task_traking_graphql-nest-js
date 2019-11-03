
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from './permission.entity';
import { RoleHasPermission} from './role_has_permission.entity';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Permission, RoleHasPermission])],
    providers: [PermissionsService],
    controllers: [PermissionsController],
    exports: [PermissionsService],
})
export class PermissionsModule {}
