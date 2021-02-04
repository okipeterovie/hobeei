import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantRegistrationComponent } from './applicant-registration/applicant-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { ApplicantRoutingModule } from './applicant-routing.module';


const ApplicationRegistrationComponents = [
  ApplicantRegistrationComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ApplicantRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModule,
    NgbModule,
  ],
  declarations: ApplicationRegistrationComponents,
  providers: ApplicationRegistrationComponents,
  exports: ApplicationRegistrationComponents
})
export class ApplicantModule { }
