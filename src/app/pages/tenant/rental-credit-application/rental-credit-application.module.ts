import { RentalCreditApplicationComponent } from './rental-credit-application.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FormWizardModule} from 'angular2-wizard';

export const rentalCreditApplicationRoutes: Routes = [
  {
    path: '',
    component: RentalCreditApplicationComponent,
    data: {
      breadcrumb: 'Kira Garanti Kredi Başvurusu',
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
    FormsModule,
    ReactiveFormsModule,
    FormWizardModule
  ],
  declarations: [RentalCreditApplicationComponent]
})
export class RentalCreditApplicationModule { }
