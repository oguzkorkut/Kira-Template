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
import { UserService } from '../../../service/user.service';
import { Role } from '../../../entity/role';

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

  professions: Profession[] = [];

  roles: Role[] = [];

  public personelInfoForm: FormGroup;
  public communicationInfoForm: FormGroup;
  public systemInfoForm: FormGroup;

  constructor(private  phoneFilter: PhoneFilterPipe, 
              private kiraService: KiraService, 
              private userService: UserService,
              private notificationsService: NotificationsService) { 

      this.mask = CONSTANTS.phoneMask;
  }


  ngOnInit() {
    this.createPersonelInfoFormGroup();
    this.createCommunicationInfoFormGroup();
    this.createSystemInfoFormGroup();

    this.getProfessions();

    this.getRoles();
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
  const smscodecb= new FormControl('');
  const epostacb= new FormControl('');
  const roles = new FormControl('', Validators.required);

  this.systemInfoForm = new FormGroup({
      username: username,
      profession: profession,
      password: password,
      repassword: repassword,
      smscodecb: smscodecb,
      epostacb: epostacb,
      roles:roles
  });
}

  cancel(){

  }
  
  save(){
    if (this.personelInfoForm.valid 
      && (this.communicationInfoForm.valid && this.phoneFilter.transform(this.communicationInfoForm.controls.phone.value) != '')
      && this.systemInfoForm.valid ) {
      let user = new User;

      user.firstname = this.personelInfoForm.controls.firstname.value;
      user.surname = this.personelInfoForm.controls.surname.value;
      user.tckn = this.personelInfoForm.controls.tckn.value;
      user.vkn = this.personelInfoForm.controls.vkn.value;

      user.phone = this.phoneFilter.transform(this.communicationInfoForm.controls.phone.value);
      user.email = this.communicationInfoForm.controls.email.value;

      user.username = this.systemInfoForm.controls.username.value;
      user.title = this.systemInfoForm.controls.profession.value;
      user.password = this.systemInfoForm.controls.password.value;

      let roles: Role[] = []

      let role: Role = new Role;

      role.id = this.systemInfoForm.controls.roles.value;

      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].id == role.id) {
          role.name = this.roles[i].name;
          break;
        }
      }

      role.name = this.systemInfoForm.controls.roles.value;

      roles.push(role);

      user.roleDtos = roles;

      this.addUser(user)
    } else {
      console.log("invalid");
    }

  }

  addUser(user: User):void{
    this.loading = true;

    this.loading = true;
    this.userService.addUser(user)
      .then((res: ReturnModel) => {
  
        this.loading = false;

        if (res.status) {
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
  }


  getProfessions(): void {

    this.loading = true;

    this.kiraService.getProfessions()
      .then((res: ReturnModel) => {
        this.loading = false;
       
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
          this.loading = false;

          this.notificationsService.error('Hata', res.statusText);
        }
      );
  }

  getRoles(): void {

    this.loading = true;
    this.userService.getRoles()
      .then((res: ReturnModel) => {
  
        this.loading = false;

        if (res.status) {
          this.roles = res.result as Role[];
        } else {
          this.notificationsService.error('Hata', res.message);
        }
      })
      .catch((res: Response) => {
          this.loading = false;

          this.notificationsService.error('Hata', res.statusText);
        }
      );
  }

}