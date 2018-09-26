import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { PaymentOrderComponent } from './payment-order.component';

export const paymentOrderRoutes: Routes = [
  {
    path: '',
    component: PaymentOrderComponent,
    data: {
      breadcrumb: 'Ödeme Talimatı',
      icon: 'icofont icofont-file-alt bg-c-blue',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(paymentOrderRoutes),
    SharedModule,
    ChartModule
  ],
  declarations: [PaymentOrderComponent]
}) 
export class PaymentOrderModule { }
