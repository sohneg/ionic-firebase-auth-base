import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user: Observable<User | null> = EMPTY;

  constructor(private afAuth: Auth) {}

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
