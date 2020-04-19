import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { SprintsComponent } from './sprints.component';
import { SprintsViewComponent } from './sprints-view.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintsRouting { }
