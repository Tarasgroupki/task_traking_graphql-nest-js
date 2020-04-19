import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DialogDataComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { NotificationsService } from './notifications/notifications.service';
import { ChatService } from './chat.service';
import { WebsocketService } from './websocket.service';
import { routes } from './app-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { LeadsModule } from './leads/leads.module';
import { SprintsModule } from './sprints/sprints.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {}};


@NgModule({
  entryComponents: [DialogDataComponent],
  declarations: [
    AppComponent,
    DialogDataComponent,
  ],
  imports: [
    AuthModule,
    ClientsModule,
    LeadsModule,
    SprintsModule,
    TasksModule,
    SettingsModule,
    UsersModule,
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    GraphQLModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    NotificationsService, WebsocketService, ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
