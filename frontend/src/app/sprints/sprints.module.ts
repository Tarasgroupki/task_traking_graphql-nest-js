import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SprintsRouting } from './sprints.routing.module';
import { SprintsComponent } from './sprints.component';
import { SprintsViewComponent } from './sprints-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { SprintsService } from './sprints.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    SprintsRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [SprintsComponent, SprintsViewComponent],
  exports: [SprintsComponent, SprintsViewComponent],
  providers: [SprintsService, AuthGuard]
})
export class SprintsModule { }
