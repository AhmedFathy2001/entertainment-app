import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

enum AuthMode {
  login,
  register,
  reset,
}

@Component({
  selector: 'app-auth-screen',
  templateUrl: './auth-screen.component.html',
  styleUrls: ['./auth-screen.component.css'],
})
export class AuthScreenComponent implements OnInit {
  authMode = AuthMode.login;
  isLogin = true;
  authBtnText: string = 'Login to your account';
  authSwitchText: string = "Don't have an account?";
  authSwitchActionText: string = 'Signup';
  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this._authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }
  onSwitchMode(isReset = false) {
    if (!isReset) {
      this.isLogin = !this.isLogin;
      !this.isLogin
        ? (this.authMode = AuthMode.login)
        : (this.authMode = AuthMode.register);
    } else {
      this.isLogin = true;
      // this.authMode = AuthMode.reset;
    }

    if (this.authMode == AuthMode.login) {
      this.authBtnText = 'Login to your account';
      this.authSwitchText = "Don't have an account?";
      this.authSwitchActionText = 'Signup';
    } else if (this.authMode == AuthMode.register) {
      this.authBtnText = 'Create an account';
      this.authSwitchText = 'Already have an account?';
      this.authSwitchActionText = 'Login';
    } else {
      this.authBtnText = 'Reset Password';
      this.authSwitchText = 'Switch to';
      this.authSwitchActionText = 'Login?';
    }
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;
    if (
      this.authMode == AuthMode.register &&
      form.value.password == form.value.confirmPassword
    ) {
      this._authService.SignUp(
        form.value.email,
        form.value.password,
        form.value.firstName,
        form.value.lastName
      );
    } else if (this.authMode == AuthMode.login) {
      this._authService.SignIn(form.value.email, form.value.password);
    } else {
      this._authService.ForgotPassword(form.value.email);
    }
  }

  onSwitchToReset() {
    this.authMode = AuthMode.reset;
    this.onSwitchMode(true);
  }

  getAuthMode() {
    if (this.authMode == AuthMode.login) {
      return 'login';
    } else if (this.authMode == AuthMode.register) {
      return 'register';
    }
    return 'reset';
  }
}
