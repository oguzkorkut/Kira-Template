import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenant',
  template: '<router-outlet><app-spinner></app-spinner></router-outlet>'
})
export class TenantComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 
}
