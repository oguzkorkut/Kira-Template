import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';

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
    SharedModule,
    FormsModule,
    HttpModule,
    DataTableModule
  ],
  declarations: [CustomerListComponent]
})
export class CustomerListModule { }
