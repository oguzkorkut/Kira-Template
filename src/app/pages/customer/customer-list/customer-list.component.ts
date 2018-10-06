import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../../entity/user';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: [
    './customer-list.component.css'
  ]
})
export class CustomerListComponent implements OnInit {

  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get(`assets/data/crm-contact.json`)
      .subscribe((data) => {
        this.data = data.json();
      });
  }

  update(user: User){
    console.log("Update");
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

}


