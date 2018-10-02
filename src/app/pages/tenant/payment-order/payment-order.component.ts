import { Account } from './../../../entity/account';
import { Bank } from './../../../entity/Bank';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../entity/user';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

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
        position: ['bottom', 'right'],
        timeOut: 3000,
        lastOnBottom: true
    };
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

    constructor() { }

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
        const paymentOrderInstallmentCount= new FormControl(0, [Validators.required, CustomValidators.gt(0)]);
        const paymentOrderTotalAmount= new FormControl(0, [Validators.required, CustomValidators.gt(0)]);
        const paymentOrderDepositAmount= new FormControl(0, [Validators.required, CustomValidators.gt(-1)]);
        const paymentOrderCommissionAmount= new FormControl(0, [Validators.required, CustomValidators.gt(-1)]);
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
        const paymentOrderEMail= new FormControl('', Validators.required);
    
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
    

    startJQuery() {

    }
}


