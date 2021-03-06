import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
        if (!permissions) {
            return true;
        }

        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();

        const jwtVerify = jwt.verify(request.req.headers.authorization.split(' ')[1], '432432423324');
        const hasPermission = () => jwtVerify.permissions.some((permission) => permissions.includes(permission));
        return jwtVerify.permissions && hasPermission();
    }
}
