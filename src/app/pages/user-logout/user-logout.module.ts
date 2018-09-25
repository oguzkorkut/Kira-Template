import { LogoutService } from './../../service/logout.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLogoutComponent } from './user-logout.component';
import { UserLoginRoutingModule } from './user-logout-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, UserLoginRoutingModule, FormsModule],
  declarations: [UserLogoutComponent],
  providers: [LogoutService],
})
export class UserLogoutModule { }
