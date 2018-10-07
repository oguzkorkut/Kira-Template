import { User } from './../entity/user';
import { StatusResponse } from './../entity/assets/statusResponse';
import { CONSTANTS } from './constants';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/toPromise';
import { ReturnModel } from '../entity/ReturnModel';
import { Role } from '../entity/role';


@Injectable()
export class UserService {
  private serviceUrl = CONSTANTS.server + '/services/user';
  private systemParameterUrl = CONSTANTS.server + '/services/systemParameter';
  private access_token: string;
  private headers: Headers = new Headers();
  constructor(private http: Http, private _cookieService: CookieService) {
    this.createHeader();
  }
  createHeader() {
    this.access_token = this._cookieService.get('Token');
    this.headers = new Headers();
    this.headers.append('Authorization', 'Bearer ' + this.access_token);
    this.headers.append('Content-Type', 'application/json');
  }

  getLoggedInUser(): Promise<ReturnModel> {
    this.createHeader();
    return this.http
      .get(this.serviceUrl + '/getUser', { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as ReturnModel;
      })
      .catch(error => this.handleError(error));
  }

  geTableTarget(): string {
    const target = this._cookieService.get('target');
    return target;
  }

  getUsername(): string {
    const target = this._cookieService.get('username');
    return target;
  }

  checkToken(): Promise<StatusResponse> {
    const url = `${this.serviceUrl}/${this.access_token}`;

    return this.http
      .get(url, { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as StatusResponse;
      })
      .catch(error => this.handleError(error));
  }

  getAllUsers(): Promise<ReturnModel>{
         
    this.createHeader();
   
    return this.http.get(this.serviceUrl + '/getUsers/', { headers: this.headers }).toPromise()
                    .then((response) => {
                      return response.json() as ReturnModel;
                    })
                    .catch(error => this.handleError(error));
  }

  deleteUser(id: number): Promise<ReturnModel>{
    this.createHeader();

    var url = this.serviceUrl + '/delete/' + id ;

    return this.http.delete(url, { headers: this.headers }).toPromise()
              .then((response) => {
                return response.json() as ReturnModel;
              })
              .catch(error => this.handleError(error));
  }

  updateUser(user: User): Promise<ReturnModel>{
    this.createHeader();
    
    var url = this.serviceUrl + '/update';

    return this.http.put(url, user, { headers: this.headers }).toPromise()
              .then((response) => {
                return response.json() as ReturnModel;
              })
              .catch(error => this.handleError(error));
  }

  addUser(user: User): Promise<ReturnModel>{
    this.createHeader();
    
    var url = this.serviceUrl + '/save';

    return this.http.post(url, user, { headers: this.headers }).toPromise()
              .then((response) => {
                return response.json() as ReturnModel;
              })
              .catch(error => this.handleError(error));
  }

  getRoles(): Promise<ReturnModel>{
    this.createHeader();
   
    return this.http.get(this.serviceUrl + '/role/getRoles', { headers: this.headers }).toPromise()
                    .then((response) => {
                      return response.json() as ReturnModel;
                    })
                    .catch(error => this.handleError(error));
  }
  
  addRole(role: Role): Promise<ReturnModel>{
        
    this.createHeader();

    return this.http.post(this.serviceUrl + '/role/save', role, { headers: this.headers }).toPromise()
                    .then((response) => {
                      return response.json() as ReturnModel;
                    })
                    .catch(error => this.handleError(error));
  }

  deleteRole(id: number): Promise<ReturnModel>{
    this.createHeader();
      
    var url = this.serviceUrl + '/role/delete/' + id ;

    return this.http.delete(url, { headers: this.headers }).toPromise()
              .then((response) => {
                return response.json() as ReturnModel;
              })
              .catch(error => this.handleError(error));
  }
 /* update(user): Promise<User> {
    return this.http
      .put(this.serviceUrl, { user }, { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as User;
      })
      .catch(error => this.handleError(error));
  }*/
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    if (error.status === 401) {
      this._cookieService.deleteAll();
      window.location.href = '/userlogin';
    }
    return Promise.reject(error.message || error);
  }
}
