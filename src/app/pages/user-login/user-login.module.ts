import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login.component';
import { UserLoginRoutingModule } from './user-login-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { UserService } from '../../service/user.service';
import { LoadingModule } from 'ngx-loading';

@NgModule({
  imports: [CommonModule, UserLoginRoutingModule, FormsModule, LoadingModule],
  declarations: [UserLoginComponent],
  providers: [LoginService, UserService],
})
export class UserLoginModule { }
