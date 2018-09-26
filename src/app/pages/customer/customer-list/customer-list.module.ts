import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';

export const CustomerListRoutes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: {
      breadcrumb: 'Müşteri Listele',
      icon: 'icofont icofont-file-alt bg-c-blue',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CustomerListRoutes),
    SharedModule,
    ChartModule
  ],
  declarations: [CustomerListComponent]
})
export class CustomerListModule { }
