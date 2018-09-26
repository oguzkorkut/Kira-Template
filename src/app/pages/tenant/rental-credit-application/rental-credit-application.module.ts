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
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
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
