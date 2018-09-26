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
      breadcrumb: 'Kira Kontratı Oluştur',
      icon: 'icofont icofont-file-alt bg-c-blue',
      status: true
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
