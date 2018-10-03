import { Row } from '../entity/row';
import { User } from '../entity/user';

import { CONSTANTS } from './constants';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/toPromise';
import { ReturnModel } from '../entity/ReturnModel';
import { CreditApplication } from '../entity/creditApplication';


@Injectable()
export class KiraService {
  private serviceUrl = CONSTANTS.server + '/services';

  private access_token: string;
  private headers: Headers = new Headers();

  private fileHeaders: Headers = new Headers();

  constructor(private http: Http, private _cookieService: CookieService) {
    this.createHeader();
  }
  createHeader() {
    this.access_token = this._cookieService.get('Token');
    this.headers = new Headers();
    this.headers.append('Authorization', 'Bearer ' + this.access_token);
    this.headers.append('Content-Type', 'application/json');
  }

  createFileHeader() {
    this.access_token = this._cookieService.get('Token');
    this.fileHeaders = new Headers();
    this.fileHeaders.append('Authorization', 'Bearer ' + this.access_token);
    this.fileHeaders.append('Content-Type', 'multipart/form-data');
  }

  getRowsBySQLKey(key: string): Promise<ReturnModel> {
    this.createHeader();
    return this.http
      .get(this.serviceUrl + '/user/getRowsBySQLKey?sqlKey=' + key, { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as ReturnModel;
      })
      .catch(error => this.handleError(error));
  }

  getCustomerInformationByTCKN(TCKN: string): Promise<ReturnModel> {
    this.createHeader();
    return this.http
      .get(this.serviceUrl + '/user/getCustomerInformationByTCKN/' + TCKN, { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as ReturnModel;
      })
      .catch(error => this.handleError(error));
  }

  
  customerInformationByCustomerNumber(customerNumber: string): Promise<ReturnModel> {
    this.createHeader();
    return this.http
      .get(this.serviceUrl + '/user/customerInformationByCustomerNumber/' + customerNumber, { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as ReturnModel;
      })
      .catch(error => this.handleError(error));
  }
  
  getCities(): Promise<ReturnModel> {
    this.createHeader();
    return this.http
      .get(this.serviceUrl + '/global/getCities', { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as ReturnModel;
      })
      .catch(error => this.handleError(error));
  }

  getProfessions(): Promise<ReturnModel> {
    this.createHeader();
    return this.http
      .get(this.serviceUrl + '/global/getProfessions', { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as ReturnModel;
      })
      .catch(error => this.handleError(error));
  }

  getEducations(): Promise<ReturnModel> {
    this.createHeader();
    return this.http
      .get(this.serviceUrl + '/global/getEducations', { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as ReturnModel;
      })
      .catch(error => this.handleError(error));
  }

  controlAppStepByTCAndMobilePhone(identityNumber: string, phone: string): Promise<ReturnModel> {
    this.createHeader();
    return this.http.post(this.serviceUrl + '/user/controlAppStepByTCAndMobilePhone/' + identityNumber + '/' + phone, {}, { headers: this.headers }).toPromise()
                    .then((response) => {
                      return response.json() as ReturnModel;
                    })
                    .catch(error => this.handleError(error));
  }

  applicationCompletion(creditApplication: CreditApplication): Promise<ReturnModel> {
    this.createHeader();
    return this.http.post(this.serviceUrl + '/user/applicationCompletion', creditApplication, { headers: this.headers }).toPromise()
                    .then((response) => {
                      return response.json() as ReturnModel;
                    })
                    .catch(error => this.handleError(error));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    if (error.status === 401) {
      this._cookieService.deleteAll();
      window.location.href = '/userlogin';
    }
    return Promise.reject(error.message || error);
  }
}
