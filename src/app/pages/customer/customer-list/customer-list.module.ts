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
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
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
