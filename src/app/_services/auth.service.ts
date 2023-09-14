import { getAuth } from 'firebase/auth';
import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  authState,
} from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user: Observable<User | null> = EMPTY;

  constructor(private afAuth: Auth, private platform: Platform) {}

  async login(email: string, password: string) {
    try {
      const user = await signInWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async register(email: string, password: string) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.afAuth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async logout() {
    return signOut(this.afAuth);
  }
}
