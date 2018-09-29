import { Component, OnInit } from '@angular/core';

declare var jquery:any;
declare var $ :any;



@Component({
  selector: 'app-payment-order',
  templateUrl: './payment-order.component.html',
  styleUrls: [
    './payment-order.component.css',
    '../../../../assets/css/j-pro/j-pro-modern.css',
    '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
  ]
})
export class PaymentOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.startJQuery();
  }
 
 startJQuery(){
 

 }

}


