import { Component, OnInit } from '@angular/core';
import { User } from '../../../entity/user';
import { CONSTANTS } from '../../../service/constants';
import { NotificationsService } from 'angular2-notifications';
import { KiraService } from '../../../service/kira.service';
import { PhoneFilterPipe } from '../../../pipe/phone-filter.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ReturnModel } from '../../../entity/ReturnModel';
import { Profession } from '../../../entity/profession';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: [
    './customer-create.component.css'
  ]
})
export class CustomerCreateComponent implements OnInit {

  public options = {
    position: ['top', 'right'],
    timeOut: 3000,
    lastOnTop: true
  };

  public mask: Array<string | RegExp>;

  public loading = false;

  user: User;

  professions: Profession[] = [];

  public personelInfoForm: FormGroup;
  public communicationInfoForm: FormGroup;
  public systemInfoForm: FormGroup;

  constructor(private  phoneFilter: PhoneFilterPipe, 
              private kiraService: KiraService, 
              private notificationsService: NotificationsService) { 

      this.mask = CONSTANTS.phoneMask;
  }


  ngOnInit() {
    this.user = new User;

    this.createPersonelInfoFormGroup();
    this.createCommunicationInfoFormGroup();
    this.createSystemInfoFormGroup();

    this.getProfessions();
  }


  createPersonelInfoFormGroup(){
    const firstname= new FormControl('', Validators.required);
    const surname= new FormControl('', Validators.required);
    const tckn= new FormControl('', [Validators.required, CustomValidators.gt(10000000000)]);
    const vkn= new FormControl('', CustomValidators.gt(0));

    this.personelInfoForm = new FormGroup({
        firstname: firstname,
        surname: surname,
        tckn: tckn,
        vkn: vkn
    });
}

createCommunicationInfoFormGroup(){
  //this.phoneFilter.transform(val.phone)

  const phone= new FormControl('', Validators.required);
  const email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);

  this.communicationInfoForm = new FormGroup({
      phone: phone,
      email: email
  });
}

createSystemInfoFormGroup(){
  const username= new FormControl('', Validators.required);
  const profession= new FormControl('', Validators.required);
  const password= new FormControl('', Validators.required);
  const repassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
  const smscode= new FormControl('');

  this.systemInfoForm = new FormGroup({
      username: username,
      profession: profession,
      password: password,
      repassword: repassword,
      smscode: smscode
  });
}

  cancel(){

  }
  
  save(){
    if (this.personelInfoForm.valid 
      && (this.communicationInfoForm.valid && this.phoneFilter.transform(this.communicationInfoForm.controls.phone.value) != '')
      && this.systemInfoForm.valid ) {
      console.log("valid");
    } else {
      console.log("invalid");
    }

  }


  getProfessions(): void {

    this.kiraService.getProfessions()
      .then((res: ReturnModel) => {
  
        if (res.status) {
          this.professions = res.result as Profession[];
  
          if(this.professions){
            //this.notificationsService.success('Bilgi', this.professions.length + " meslek kaydı çekildi.");
          }
        } else {
          this.notificationsService.error('Hata', res.message);
        }
      })
      .catch((res: Response) => {
          this.notificationsService.error('Hata', res.statusText);
        }
      );
  }

}