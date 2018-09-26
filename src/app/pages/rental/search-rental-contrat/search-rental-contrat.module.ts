import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { SearchRentalContratComponent } from './search-rental-contrat.component';

export const searchRentalContratRoutes: Routes = [
  {
    path: '',
    component: SearchRentalContratComponent,
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
    RouterModule.forChild(searchRentalContratRoutes),
    SharedModule,
    ChartModule
  ],
  declarations: [SearchRentalContratComponent]
})
export class SearchRentalContratModule { }
