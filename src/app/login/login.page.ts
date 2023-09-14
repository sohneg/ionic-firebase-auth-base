import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  MenuController,
} from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { GoogleAuthService } from '../_services/google-auth.service';
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
    private googleAuthService: GoogleAuthService,
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

  async singInWithGoogle() {
    try {
      const user = await this.googleAuthService.googleSignIn();
      if (user == null) {
        this.showAlert('Login failed', 'Please try again!');
        return;
      }
      this.router.navigateByUrl('home', { replaceUrl: true });
    } catch {}
  }

  async refresh() {
    await this.googleAuthService.refresh();
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
