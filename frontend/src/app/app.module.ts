import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent, DialogDataComponent} from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthLogoutsComponent } from './auth/auth-logout.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsViewComponent } from './clients/clients-view.component';
import { ClientsCreateComponent } from './clients/clients-create.component';
import { ClientsUpdateComponent } from './clients/clients-update.component';
import { ClientsDeleteComponent } from './clients/clients-delete.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadsViewComponent } from './leads/leads-view.component';
import { LeadsCreateComponent } from './leads/leads-create.component';
import { LeadsUpdateComponent } from './leads/leads-update.component';
import { LeadsDeleteComponent } from './leads/leads-delete.component';
import { SprintsComponent } from './sprints/sprints.component';
import { SprintsViewComponent } from './sprints/sprints-view.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsCreateComponent } from './settings/settings-create.component';
import { SettingsUpdateComponent } from './settings/settings-update.component';
import { GraphQLModule } from './graphql.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from './auth/auth.service';
import {ClientsService} from './clients/clients.service';
import {AuthGuard} from './auth/auth.guard';
import {LeadsService} from './leads/leads.service';
import {SprintsService} from './sprints/sprints.service';
import {TasksService} from './tasks/tasks.service';
import {NotificationsService} from './notifications/notifications.service';
import {UsersService} from './users/users.service';
import { SettingsService } from './settings/settings.service';
import {ChatService} from './chat.service';
import {WebsocketService} from './websocket.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {UsersProfileComponent} from './users/users-profile.component';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {}};


@NgModule({
  entryComponents: [DialogDataComponent],
  declarations: [
    AppComponent,
    DialogDataComponent,
    AuthComponent,
    AuthLogoutsComponent,
    ClientsComponent,
    ClientsViewComponent,
    ClientsCreateComponent,
    ClientsUpdateComponent,
    ClientsDeleteComponent,
    LeadsComponent,
    LeadsViewComponent,
    LeadsCreateComponent,
    LeadsUpdateComponent,
    LeadsDeleteComponent,
    SprintsComponent,
    SprintsViewComponent,
    TasksComponent,
    UsersComponent,
    UsersProfileComponent,
    SettingsComponent,
    SettingsCreateComponent,
    SettingsUpdateComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: AuthComponent,
      //  canActivate: [AuthGuard]
      },
      {
        path: 'logout',
        component: AuthLogoutsComponent,
       // canActivate: [AuthGuard]
      },
      {
       path: 'clients',
       component: ClientsComponent,
       canActivate: [AuthGuard]
      },
      {
        path: 'clients/create',
        component: ClientsCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'clients/:id',
        component: ClientsViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'clients/add/:id',
        component: ClientsUpdateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'clients/delete/:id',
        component: ClientsDeleteComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'leads',
        component: LeadsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'leads/:id',
        component: LeadsViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'lead/create',
        component: LeadsCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'leads/add/:id',
        component: LeadsUpdateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'leads/delete/:id',
        component: LeadsDeleteComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sprints',
        component: SprintsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sprints/:id',
        component: SprintsViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: UsersProfileComponent
      },
      {
        path: 'roles',
        component: SettingsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'role/create',
        component: SettingsCreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'roles/add/:id',
        component: SettingsUpdateComponent,
        canActivate: [AuthGuard]
      }
    ]),
    GraphQLModule,
    BrowserAnimationsModule,
    MaterialModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
      AuthService, ClientsService, LeadsService, SprintsService, TasksService,
    NotificationsService, UsersService, SettingsService, ChatService, WebsocketService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
