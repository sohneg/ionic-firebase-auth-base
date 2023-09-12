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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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
      c_password: new FormControl('', [
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

  c_password() {
    return this.contactForm.get('c_password')!.value;
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.email(), this.password());
    loading.dismiss();

    if (user) {
      this.router.navigateByUrl('home', { replaceUrl: true });
    } else {
      this.showAlert('Registration failed', 'Please try again!');
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
