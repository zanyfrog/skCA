import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, NavController, NavParams, ViewController } from 'ionic-angular';

import { AuthService } from '../../services/services';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  loginForm: FormGroup;
  loginData: any;
  errorMsg = '';

  constructor(
    public auth: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;
    let loader = this.loadingCtrl.create({
      content: 'Checking Credentials...'
    });
    loader.present().then(() => {
      this.auth.login(email, password)
        .subscribe
        (data => {
          loader.dismiss();
          this.viewCtrl.dismiss();
        },
        error => {
          loader.dismiss();
          this.errorMsg = error._body
        })
    });
  }


}
