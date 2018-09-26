import {Routes} from '@angular/router';
import { RentalComponent } from './rental.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

export const rentalRoutes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Kira İşlemleri',
      status: false
    },
    children: [
          {
            path: 'new-rental-contrat',
            loadChildren: './new-rental-contrat/new-rental-contrat.module#NewRentalContratModule'
          }, 
          {
            path: 'search-rental-contrat',
            loadChildren: './search-rental-contrat/search-rental-contrat.module#SearchRentalContratModule'
          }
    ] 
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rentalRoutes),
    SharedModule
  ],
  declarations: [RentalComponent]
})
export class RentalModule {
}


