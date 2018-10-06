import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { CustomerCreateComponent } from './customer-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { UiSwitchModule } from 'ng2-ui-switch';
import { DatepickerModule } from 'angular2-material-datepicker';
import { LoadingModule } from 'ngx-loading';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { KiraService } from '../../../service/kira.service';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';

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
    TextMaskModule,
    ReactiveFormsModule,
    UiSwitchModule,
    CurrencyMaskModule,
    DatepickerModule,
    SimpleNotificationsModule.forRoot(),
    LoadingModule
  ],
  providers:[
    KiraService,
    NotificationsService,
    PhoneFilterPipe
  ],
  declarations: [CustomerCreateComponent]
})
export class CustomerCreateModule { }
