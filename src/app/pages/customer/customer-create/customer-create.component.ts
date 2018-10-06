import { Component, OnInit } from '@angular/core';
import { User } from '../../../entity/user';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: [
    './customer-create.component.css'
  ]
})
export class CustomerCreateComponent implements OnInit {

  public options = {
    position: ['top', 'right'],
    timeOut: 3000,
    lastOnTop: true
  };

  public mask: Array<string | RegExp>;

  public loading = false;

  user: User;

  constructor() { }

  ngOnInit() {

    this.user = new User;
  }

  cancel(){

  }
  
  save(){

  }

}