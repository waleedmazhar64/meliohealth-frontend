import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
