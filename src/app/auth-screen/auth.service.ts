import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

interface User {
  uid: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: User; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = {
          uid: user.uid,
          email: user.email!,
          photoURL: user.photoURL!,
          emailVerified: user.emailVerified,
        };
        localStorage.setItem('user', JSON.stringify(this.userData));

        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          await this.SetUserData(result.user);
          await this.router.navigate(['/home']);
        });
    } catch (error: any) {
      window.alert(error.message);
    }
  }
  // Sign up with email/password
  async SignUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      let usersRef = this.afs.firestore
        .collection('users')
        .doc(result.user?.uid)
        .set({
          firstName: firstName,
          lastName: lastName,
          bookmarks: [],
        });
      /* Call the SendVerificaitonMail() function when new user sign
      up and returns promise */
      this.SendVerificationMail();
      this.SetUserData(result.user);
    } catch (error: any) {
      window.alert(error.message);
    }
  }
  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }
  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const isLoginRoute = this.router.url === '/login' ? true : false;
    console.log(isLoginRoute);

    const user = JSON.parse(localStorage.getItem('user')!);
    if (user !== null) {
      return true;
    } else {
      return false;
    }
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user !== null) {
      return user.emailVerified;
    } else {
      return false;
    }
  }

  // Sign in with Google
  async GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['home']);
      }
    });
  }
  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  async SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
