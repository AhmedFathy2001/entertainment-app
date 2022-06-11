import { Component, Input, OnInit } from '@angular/core';
import { Show } from 'src/app/show.model';
import { ShowsService } from 'src/app/shows.service';

@Component({
  selector: 'app-trending-show',
  templateUrl: './trending-show.component.html',
  styleUrls: ['./trending-show.component.css'],
})
export class TrendingShowComponent implements OnInit {
  isHovering: boolean = false;
  @Input() trending!: Show;
  constructor(private _showsService: ShowsService) {}

  bookmark() {
    this._showsService.bookmarkedShow(this.trending);
  }

  ngOnInit(): void {}
}
