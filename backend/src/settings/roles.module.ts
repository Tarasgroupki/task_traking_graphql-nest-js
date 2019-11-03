
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { RoleHasPermission} from './role_has_permission.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleResolver } from './role.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Permission, RoleHasPermission])],
    providers: [RolesService, RoleResolver],
    controllers: [RolesController],
    exports: [RolesService],
})
export class RolesModule {}
