import {Routes} from '@angular/router';
import { TenantComponent } from './tenant.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

export const tenantRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Kiracı İşlemleri',
      status: false
    },
    children: [
          {
            path: 'payment-order',
            loadChildren: './payment-order/payment-order.module#PaymentOrderModule'
          }, 
          {
            path: 'rental-credit-application',
            loadChildren: './rental-credit-application/rental-credit-application.module#RentalCreditApplicationModule'
          }
    ] 
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(tenantRoutes),
    SharedModule
  ],
  declarations: [TenantComponent]
})
export class TenantModule {
}


