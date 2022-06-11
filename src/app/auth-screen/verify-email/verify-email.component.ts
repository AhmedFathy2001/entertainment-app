import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this._authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }
}
