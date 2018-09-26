import { RentalCreditApplicationComponent } from './rental-credit-application.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';

export const rentalCreditApplicationRoutes: Routes = [
  {
    path: '',
    component: RentalCreditApplicationComponent,
    data: {
      breadcrumb: 'Kira Kredisi Başvurusu',
      icon: 'icofont icofont-file-alt bg-c-blue',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rentalCreditApplicationRoutes),
    SharedModule,
    ChartModule
  ],
  declarations: [RentalCreditApplicationComponent]
})
export class RentalCreditApplicationModule { }
