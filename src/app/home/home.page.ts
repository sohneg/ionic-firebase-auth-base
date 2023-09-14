import { Component, OnInit } from '@angular/core';
import { GoogleAuthService } from '../_services/google-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private googleAuthService: GoogleAuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  async logout() {
    await this.googleAuthService.logout();
    this.router.navigateByUrl('welcome', { replaceUrl: true });
  }
}
