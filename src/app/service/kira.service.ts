import { Row } from '../entity/row';
import { User } from '../entity/user';

import { CONSTANTS } from './constants';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/toPromise';
import { ReturnModel } from '../entity/ReturnModel';


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

  print(numberOfCopies: number, labelQuality: string, rows: Row[]): Promise<ReturnModel> {
    this.createHeader();
    return this.http
      .post(this.serviceUrl + '/file/print?numberOfCopies=' + numberOfCopies + '&labelQuality=' + labelQuality, rows, { headers: this.headers })
      .toPromise()
      .then((response) => {
        return response.json() as ReturnModel;
      })
      .catch(error => this.handleError(error));
  }


  importFile(fileName, fileToUpload): Promise<ReturnModel> {
    const url = this.serviceUrl + '/file/upload';

    this.createFileHeader();

    const file: File = fileToUpload;
    const formData: FormData = new FormData();
    formData.append('uploadFile', file, file.name);

    return this.http.post(url, formData, { headers: this.fileHeaders })
      .toPromise()
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
