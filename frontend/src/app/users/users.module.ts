import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRouting } from './users.routing.module';
import { UsersComponent } from './users.component';
import { UsersProfileComponent } from './users-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    UsersRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [UsersComponent, UsersProfileComponent],
  exports: [UsersComponent, UsersProfileComponent],
  providers: [UsersService, AuthGuard]
})
export class UsersModule { }
