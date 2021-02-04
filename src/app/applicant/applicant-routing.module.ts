import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/authentication.guard';
import { RouteData } from '../core/route-data.model';
import { ApplicantRegistrationComponent } from './applicant-registration/applicant-registration.component';


export const ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register-vehicle',
  },
  {
    path: 'register-vehicle',
    // canActivate: [AuthenticationGuard],
    component: ApplicantRegistrationComponent,
    data: {
      title: 'Applicant Registration',
      privileges: ["application_processor_privilege"],
    } as RouteData,
  },
  {
    path: 'view/:id',
    canActivate: [AuthenticationGuard],
    component: ApplicantRegistrationComponent,
    data: {
      title: 'Applicant Registration',
      privileges: ["application_processor_privilege", "application_reviewer_privilege"],
    } as RouteData,
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class ApplicantRoutingModule { }
