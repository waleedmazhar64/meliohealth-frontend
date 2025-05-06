import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'patient' }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
