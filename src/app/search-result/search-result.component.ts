import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../show.model';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent implements OnInit {
  isHovering: boolean = false;
  search!: Show[];
  searchQuery: string = '';
  constructor(
    private _showsService: ShowsService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.searchQuery = params['search'];
      this._showsService
        .getSearchResults(this.searchQuery)
        .subscribe((res) => (this.search = res));
    });
  }
}
