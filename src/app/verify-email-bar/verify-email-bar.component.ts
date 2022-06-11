import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-email-bar',
  templateUrl: './verify-email-bar.component.html',
  styleUrls: ['./verify-email-bar.component.css'],
})
export class VerifyEmailBarComponent implements OnInit {
  isDismissed = false;
  constructor() {}

  ngOnInit(): void {}

  dismissBanner() {
    this.isDismissed = true;
  }
}
