import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private _cookieService: CookieService) {}

  canActivate() {
    if (this._cookieService.get('isLoggedin')) {
      return true;
    } else {
      this.router.navigate(['/userlogin']);
      return false;
    }
  }
}
