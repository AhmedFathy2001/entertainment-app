import { Component, OnInit } from '@angular/core';
import { Show } from '../show.model';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  isHovering: boolean = false;
  movies!: Show[];
  series!: Show[];

  constructor(private _showsService: ShowsService) {}

  ngOnInit(): void {
    this.getShows();
  }

  async getShows() {
    (await this._showsService.getBookmarks('TV Series')).subscribe((series) => {
      this.series = series;
    });
    (await this._showsService.getBookmarks('movie')).subscribe((movies) => {
      this.movies = movies;
    });
    console.log(this.series);
    console.log(this.movies);
  }
}
