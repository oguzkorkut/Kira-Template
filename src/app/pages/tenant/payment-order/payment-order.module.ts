import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import { PaymentOrderComponent } from './payment-order.component';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { LoadingModule } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { UiSwitchModule } from 'ng2-ui-switch';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DatepickerModule } from 'angular2-material-datepicker';
import { KiraService } from '../../../service/kira.service';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';

export const paymentOrderRoutes: Routes = [
  {
    path: '',
    component: PaymentOrderComponent,
    data: {
      breadcrumb: 'Ödeme Talimatı',
      icon: 'icofont icofont-file-alt bg-c-blue',
      status: true
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(paymentOrderRoutes),
    SharedModule,
    CommonModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    UiSwitchModule,
    CurrencyMaskModule,
    DatepickerModule,
    SimpleNotificationsModule.forRoot(),
    LoadingModule,
  ],
  providers:[
    KiraService,
    NotificationsService,
    PhoneFilterPipe
  ],
  declarations: [PaymentOrderComponent]
}) 
export class PaymentOrderModule { }
