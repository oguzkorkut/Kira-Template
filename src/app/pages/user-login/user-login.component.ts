import { ReturnModel } from './../../entity/ReturnModel';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { routerTransition } from '../../shared/router.animations';
import { UserCredential } from '../../entity/userCredential';
import { LoginService } from '../../service/login.service';
import { AuthResponse } from '../../entity/authResponse';
import { UserService } from '../../service/user.service';
import { User } from '../../entity/user';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations: [routerTransition()]
})
export class UserLoginComponent implements OnInit {

  userCredential: UserCredential = { username: '', password: '' };
  isLoginCredentialCorrect = false;
  errorMessage = '';
  public loading = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _cookieService: CookieService,
    private userService: UserService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    if (this._cookieService.get('isLoggedin')) {
      this.userService.checkToken().then((statusResponse => {
        this.router.navigate(['/dashboard/default']);
      }))
        .catch(e => {
          this._cookieService.deleteAll();
        });
    }
  }

  onLoggedin() {
    if (this.userCredential.password === '' || this.userCredential.username === '') {
      this.isLoginCredentialCorrect = false;
      this.errorMessage = 'Geçerli kullanıcı adı veya şifre giriniz.';
    } else {
      this.loading = true;
      this.loginService.getAuthenticated(this.userCredential)
        .then(
        (res: AuthResponse) => {
          this.isLoginCredentialCorrect = true;
          this._cookieService.set('Token', res.access_token);
          this._cookieService.set('isLoggedin', 'true');
          this._cookieService.set('username', this.userCredential.username);

          this.userService.getLoggedInUser().then((returnModel: ReturnModel) => {

            const user = returnModel.result as User;
            this._cookieService.set('target', user.target);
            const that = this;
            that.router.navigate(['/dashboard/default'], { relativeTo: that.route });

          }).catch((resp: Response) => {
              if (resp.status === 400) {
                this.isLoginCredentialCorrect = false;
                this.errorMessage = 'Yanlış kullanıcı adı veya şifre girdiniz.';
              } else {
                this.isLoginCredentialCorrect = false;
                this.errorMessage = 'Servis bağlantısında bir hata oluştu.';
               }
               this.loading = false;
          });
        })
        .catch(
        (res: Response) => {
          if (res.status === 400) {
            this.isLoginCredentialCorrect = false;
            this.errorMessage = 'Yanlış kullanıcı adı veya şifre girdiniz.';
          } else {
            this.isLoginCredentialCorrect = false;
            this.errorMessage = 'Servis bağlantısında bir hata oluştu.';
           }
           this.loading = false;
        }
        );
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onLoggedin();
    }
  }
}
