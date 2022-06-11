import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadeAnimation } from '../animations';
import { AuthService } from '../auth-screen/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fadeAnimation],
})
export class MainComponent implements OnInit {
  isEmailVerified = true;

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.isEmailVerified = this.auth.isEmailVerified;
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'];
  }
}
