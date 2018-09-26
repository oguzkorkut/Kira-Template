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
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
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
