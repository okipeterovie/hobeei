import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from 'src/app/bootstrap/bootstrap.module';
import { ApplicationReviewerRoutingModule } from './application-reviewer-routing.module';
import { ApplicationReviewerDashboardComponent } from './application-reviewer-dashboard/application-reviewer-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const ApplicationReviewerComponents = [
  ApplicationReviewerDashboardComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ApplicationReviewerRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModule,
    NgbModule
  ],
  declarations: ApplicationReviewerComponents,
  providers: ApplicationReviewerComponents,
  exports: ApplicationReviewerComponents
})
export class ApplicationReviewerModule { }
