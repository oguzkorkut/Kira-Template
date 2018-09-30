import { RentalCreditApplicationComponent } from './rental-credit-application.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {FormWizardModule} from 'angular2-wizard';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { TextMaskModule } from 'angular2-text-mask';
import {UiSwitchModule} from 'ng2-ui-switch/dist';
import { WizardComponent } from '../../wizard/WizardComponent';
import { WizardStepComponent } from '../../wizard/wizard-step.component';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';
import {DatepickerModule} from 'angular2-material-datepicker';
import {ToastyModule} from 'ng2-toasty';
import { KiraService } from '../../../service/kira.service';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

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
    TextMaskModule,
    ReactiveFormsModule,
    //FormWizardModule,
    UiSwitchModule,
    CurrencyMaskModule,
    DatepickerModule,
    ToastyModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
  ],
  providers: [
    //{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    PhoneFilterPipe,
    KiraService,
    NotificationsService
  ],
  declarations: [
      PhoneFilterPipe,
      RentalCreditApplicationComponent,
      WizardComponent,
      WizardStepComponent
    ],
    exports: [ ]
})
export class RentalCreditApplicationModule { }
