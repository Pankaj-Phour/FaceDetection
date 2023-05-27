import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraComponent } from './camera/camera.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { VideosComponent } from './videos/videos.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path:'',
     component:LoginComponent

  },
  {
    path:'dashboard',
     component:DashboardComponent,
     canActivate : [AuthGuard]

  },
  {
    path:'camera',
     component:CameraComponent,
     canActivate : [AuthGuard]

  },
  {
    path:'videos', 
    component:VideosComponent,
    canActivate : [AuthGuard]
  },
  {
    path : '**',
    redirectTo : ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
