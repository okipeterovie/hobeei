import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './../core/authentication.guard';
import { ApplicationProcessorDashboardComponent } from './application-processor-dashboard/application-processor-dashboard.component';
import { RouteData } from '../core/route-data.model';

export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    canActivate: [AuthenticationGuard],
    component: ApplicationProcessorDashboardComponent,
    data: {
      title: 'Application Processor Dashboard',
      privileges: ["application_processor_privilege"],
    } as RouteData,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ApplicationProcessorRoutingModule { }
