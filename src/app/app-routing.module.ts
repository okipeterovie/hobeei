import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/login' },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'application-processor',
    component: DashboardLayoutComponent,
    loadChildren: () => import('./application-processor/application-processor.module').then(m => m.ApplicationProcessorModule)
  },
  {
    path: 'application-reviewer',
    component: DashboardLayoutComponent,
    loadChildren: () => import('./application-reviewer/application-reviewer.module').then(m => m.ApplicationReviewerModule)
  },
  {
    path: 'applicant',
    component: DashboardLayoutComponent,
    loadChildren: () => import('./applicant/applicant.module').then(m => m.ApplicantModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
