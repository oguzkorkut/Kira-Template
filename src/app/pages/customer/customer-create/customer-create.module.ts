import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { CustomerCreateComponent } from './customer-create.component';

export const CustomerCreateRoutes: Routes = [
  {
    path: '',
    component: CustomerCreateComponent,
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
    RouterModule.forChild(CustomerCreateRoutes),
    SharedModule,
    ChartModule
  ],
  declarations: [CustomerCreateComponent]
})
export class CustomerCreateModule { }
