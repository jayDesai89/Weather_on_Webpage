import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { BgisDashboardComponent } from './bgis-dashboard/bgis-dashboard.component';


const routes: Routes = [
  /**
   * If dashboard requires independent module then below line will apply lazy loading of "DashboardComponent"
   * {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
   */
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
