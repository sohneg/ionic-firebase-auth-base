import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  contactForm: FormGroup;

  constructor(
    private menuCtrl: MenuController,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.contactForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  email() {
    return this.contactForm.get('email')!.value;
  }

  password() {
    return this.contactForm.get('password')!.value;
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  sendloginForm() {
    console.log('Do something fancy with the form...');
    console.log('Password: ' + this.contactForm.get('password')!.value);
    console.log('Email: ' + this.contactForm.get('email')!.value);
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.login(this.email(), this.password());
    loading.dismiss();

    if (user) {
      this.router.navigateByUrl('home', { replaceUrl: true });
    } else {
      this.showAlert('Login failed', 'Please try again!');
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok!'],
    });
    await alert.present();
  }
}
