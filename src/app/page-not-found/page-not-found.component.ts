import {
  Component,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  pageX: number = window.innerWidth;
  pageY: number = window.innerHeight;
  mouseY: number = 0;
  mouseX: number = 0;
  yAxis: number = 0;
  xAxis: number = 0;
  @HostListener('window:mousemove', ['$event'])
  ghostEyes(e: MouseEvent) {
    this.mouseY = e.pageY;
    this.yAxis = ((this.pageY / 2 - this.mouseY) / this.pageY) * 300;
    this.mouseX = e.pageX / -this.pageX;
    this.xAxis = -this.mouseX * 100 - 100;
  }

  constructor() {}

  ngOnInit(): void {}
}
