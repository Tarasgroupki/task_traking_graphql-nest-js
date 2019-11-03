import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from './clients/clients.module';
import { LeadsModule } from './leads/leads.module';
import { SprintsModule } from './sprints/sprints.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './settings/roles.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PermissionsModule } from './settings/permissions.module';
import { GraphQLModule } from '@nestjs/graphql';
import * as GraphQLJSON from 'graphql-type-json';
import { PubSub } from 'graphql-subscriptions';
/*import { Client } from './clients/client.entity';




import { ClientsService } from './clients/clients.service';
import { ClientsController } from './clients/clients.controller';*/
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'task_traking_nest',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
     // debug: false,
      // playground: false,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      resolvers: { JSON: GraphQLJSON },
      include: [ClientsModule, LeadsModule, SprintsModule, TasksModule, UsersModule, RolesModule, AuthModule, NotificationsModule],
      context: ({ req }) => ({ req })
    }),
    ClientsModule,
    LeadsModule,
    SprintsModule,
    TasksModule,
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
