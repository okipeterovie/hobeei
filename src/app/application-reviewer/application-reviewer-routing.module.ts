import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './../core/authentication.guard';
import { ApplicationReviewerDashboardComponent } from './application-reviewer-dashboard/application-reviewer-dashboard.component';
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
    component: ApplicationReviewerDashboardComponent,
    data: {
      title: 'Application Processor Dashboard',
      privileges: ["application_processor_privilege", "application_reviewer_privilege"],
    } as RouteData,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ApplicationReviewerRoutingModule { }
