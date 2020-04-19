import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRouting } from './tasks.routing.module';
import { TasksComponent } from './tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    TasksRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [TasksComponent],
  exports: [TasksComponent],
  providers: [TasksService, AuthGuard]
})
export class TasksModule { }
