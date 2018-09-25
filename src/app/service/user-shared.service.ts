import { User } from '../entity/user';

import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { isNull } from 'util';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class UserSharedService {
    user: User;
    subject = new Subject();
    fundsChange = new Subject();
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    constructor(private userService: UserService, private _cookieService: CookieService) {
    }

    async resetUser() {
        this.user = null;
        await this.getUser();
    }
    findIndexToUpdate(newItem) {
        return newItem.name === this;
    }

    async getUser() {
        //if (this.user === undefined || isNull(this.user)) {
          //  this.user = await this.userService.getLoggedInUser();
          //  this.fundsChange.next(new Date());
        //}
    }
    purgeAuth() {
        this._cookieService.deleteAll();
    }
    /*updateUser(user): Promise<User> {
        return this.userService.update(user);
    }*/
}
