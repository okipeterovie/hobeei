import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BootstrapModule } from 'src/app/bootstrap/bootstrap.module';
import { ApplicationProcessorRoutingModule } from './application-processor-routing.module';
import { ApplicationProcessorDashboardComponent } from './application-processor-dashboard/application-processor-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const ApplicationProcessorComponents = [
  ApplicationProcessorDashboardComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ApplicationProcessorRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapModule,
    NgbModule
  ],
  declarations: ApplicationProcessorComponents,
  providers: ApplicationProcessorComponents,
  exports: ApplicationProcessorComponents
})
export class ApplicationProcessorModule { }
