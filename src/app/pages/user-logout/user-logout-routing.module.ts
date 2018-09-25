import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLogoutComponent } from './user-logout.component';

const routes: Routes = [
  {
    path: '',
    component: UserLogoutComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLoginRoutingModule { }
