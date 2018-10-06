import { Account } from './../../../entity/account';
import { Bank } from './../../../entity/Bank';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../entity/user';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { CONSTANTS } from '../../../service/constants';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';
import { KiraService } from '../../../service/kira.service';
import { NotificationsService } from 'angular2-notifications';
import { ReturnModel } from '../../../entity/ReturnModel';

declare var $: any;

@Component({
    selector: 'app-payment-order',
    templateUrl: './payment-order.component.html',
    styleUrls: [
        './payment-order.component.css'
    ]
})
export class PaymentOrderComponent implements OnInit {

    public options = {
        position: ['top', 'right'],
        timeOut: 3000,
        lastOnTop: true
    };

    public mask: Array<string | RegExp>;

    public loading = false;

    /**
     * 
     */
    tenant: User;
    residenceOwner: User;

    banks: Bank[] = [];
    accounts: Account[] = [];

    public residenceOwnerForm: FormGroup;
    public paymentPlanForm: FormGroup;
    public communicationPreferenceForm: FormGroup;
    public notificationPreferenceForm: FormGroup;

    constructor(private  phoneFilter: PhoneFilterPipe, 
                private kiraService: KiraService, 
                private notificationsService: NotificationsService) { 

        this.mask = CONSTANTS.phoneMask;
    }

    ngOnInit() {
        this.tenant = new User;
        this.residenceOwner = new User;


        this.createResidenceOwnerFormGroup();

        this.createPaymentPlanFormGroup();

        this.createCommunicationPreferenceFormGroup();

        this.createNotificationPreferenceFormGroup();

        this.startJQuery();
    }

    createResidenceOwnerFormGroup(){
        const paymentOrderInstallmentCount= new FormControl('', [Validators.required, CustomValidators.gt(0)]);
        const paymentOrderTotalAmount= new FormControl('', [Validators.required, CustomValidators.gt(0)]);
        const paymentOrderDepositAmount= new FormControl('', [Validators.required, CustomValidators.gt(-1)]);
        const paymentOrderCommissionAmount= new FormControl('', [Validators.required, CustomValidators.gt(-1)]);
        const paymentOrderFirstInstallmentDate= new FormControl('', Validators.required);

        this.paymentPlanForm = new FormGroup({
            paymentOrderInstallmentCount: paymentOrderInstallmentCount,
            paymentOrderTotalAmount: paymentOrderTotalAmount,
            paymentOrderDepositAmount: paymentOrderDepositAmount,
            paymentOrderCommissionAmount: paymentOrderCommissionAmount,
            paymentOrderFirstInstallmentDate: paymentOrderFirstInstallmentDate
        });
    }

    createPaymentPlanFormGroup(){
        const residenceOwnerBank= new FormControl('', Validators.required);
        const residenceOwnerAccount= new FormControl('', Validators.required);
    
        this.residenceOwnerForm = new FormGroup({
            residenceOwnerBank: residenceOwnerBank,
            residenceOwnerAccount: residenceOwnerAccount
        });
    }

    createCommunicationPreferenceFormGroup(){
        const paymentOrderMobilePhone= new FormControl('', Validators.required);
        const paymentOrderEMail= new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);

            //var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
             //return emailRegex.test(email);
    
        this.communicationPreferenceForm = new FormGroup({
            paymentOrderMobilePhone: paymentOrderMobilePhone,
            paymentOrderEMail: paymentOrderEMail
        });
    }


    createNotificationPreferenceFormGroup(){
    
        const firstNotificationPreferences = new FormControl('', [Validators.required]);
        const lastNotificationPreferences = new FormControl('', [Validators.required]);

        this.notificationPreferenceForm = new FormGroup({
            firstNotificationPreferences:firstNotificationPreferences,
            lastNotificationPreferences:lastNotificationPreferences
        });
    }

    getResidenceOwnerByIdentity(identityElement: HTMLInputElement){
        if (identityElement.value) {
            console.log(identityElement.value);
           
            this.loading = true;
            this.kiraService.getCustomerInformationByTCKN(0, identityElement.value)
              .then((res: ReturnModel) => {
          
                this.loading = false;
                if (res.status) {
                //Obje
                  this.notificationsService.success('Bilgi', res.message);
                } else {
                  this.notificationsService.error('Hata', res.message);
                }
              })
              .catch((res: Response) => {
                this.notificationsService.error('Hata', res.statusText);
                this.loading = false;
              }
            );
        } else {
            this.notificationsService.warn("Bilgi","T.C. Kimlik numarası giriniz!");
        }
    }

    cancelApplication(){

    }
    
    approveApplication(){
        if (this.residenceOwnerForm.valid 
                && this.paymentPlanForm.valid 
                && this.communicationPreferenceForm.valid 
                && this.notificationPreferenceForm.valid) {
            console.log("valid");
        } else {
            console.log("invalid");
        }

    }

    startJQuery() {

    }
}


