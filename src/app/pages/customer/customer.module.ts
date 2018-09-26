import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import { CustomerComponent } from './customer.component';
import {SharedModule} from '../../shared/shared.module';

export const customerRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Müşteri İşlemleri',
      status: false
    },
    children: [
          {
            path: 'customer-create',
            loadChildren: './customer-create/customer-create.module#CustomerCreateModule'
          }, 
          {
            path: 'customer-list',
            loadChildren: './customer-list/customer-list.module#CustomerListModule'
          }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    SharedModule
  ],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
