import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { NewRentalContratComponent } from './new-rental-contrat.component';

export const newRentalContratRoutes: Routes = [
  {
    path: '',
    component: NewRentalContratComponent,
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
    RouterModule.forChild(newRentalContratRoutes),
    SharedModule
  ],
  declarations: [NewRentalContratComponent]
}) 
export class NewRentalContratModule { }
