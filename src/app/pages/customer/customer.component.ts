import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: '<router-outlet><app-spinner></app-spinner></router-outlet>'
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 
}
