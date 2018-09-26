import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { CustomerCreateComponent } from './customer-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const CustomerCreateRoutes: Routes = [
  {
    path: '',
    component: CustomerCreateComponent,
    data: {
      breadcrumb: 'Müşteri Oluştur',
      icon: 'icofont icofont-file-alt bg-c-blue',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CustomerCreateRoutes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CustomerCreateComponent]
})
export class CustomerCreateModule { }
