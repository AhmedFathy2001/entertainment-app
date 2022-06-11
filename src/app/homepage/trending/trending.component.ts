import { Component, OnInit } from '@angular/core';
import { Show } from 'src/app/show.model';
import { ShowsService } from 'src/app/shows.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
  trendingShows!: Show[];
  dragging: boolean = false;

  constructor(private _showsService: ShowsService) {}

  async ngOnInit(): Promise<void> {
    (await this._showsService
      .getHomePageContent(true))
      .subscribe((shows) => (this.trendingShows = shows));
  }
}
