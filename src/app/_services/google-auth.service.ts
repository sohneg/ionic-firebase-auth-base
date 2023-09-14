import { Injectable } from '@angular/core';
import '@codetrix-studio/capacitor-google-auth';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { GoogleAuthProvider, UserCredential, getAuth } from 'firebase/auth';
import { Auth, signInWithCredential, signOut } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  public guser: User | null = null;

  constructor(private afAuth: Auth) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }
  }

  async googleSignIn(): Promise<UserCredential | null> {
    try {
      let googleUser = await GoogleAuth.signIn();
      const credential = GoogleAuthProvider.credential(
        googleUser.authentication.idToken
      );
      return signInWithCredential(this.afAuth, credential);
    } catch {
      return null;
    }
  }

  async refresh() {
    const auth = getAuth();
    console.log('getAuth ', auth);
    this.afAuth.currentUser;
    const authCode = await GoogleAuth.refresh();
    console.log('AuthCode ', authCode);
    return authCode.accessToken;
  }

  async logout() {
    GoogleAuth.signOut();
    signOut(this.afAuth);
  }
}
