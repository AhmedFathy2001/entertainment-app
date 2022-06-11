import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  constructor(private _showsService: ShowsService, private router: Router) {}
  searchTerms!: string[];
  searchIsEmpty: boolean = false;
  //fix search functionality and the look of the search component
  ngOnInit(): void {
    this._showsService
      .getTitles()
      .subscribe((res) => (this.searchTerms = res.map((resp) => resp.title)));
  }

  searchWithInput($event: KeyboardEvent, term: string): void {
    if ($event.key == 'Enter' && term != '') {
      this.router.navigate(['/search-result/', term]);
    }
  }
  
  onSearchItemClick(term: string): void {
    if (term != '') {
      this.router.navigate(['/search-result/', term]);
    }
  }

  public model: any;

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        const searchResults = this.searchTerms
          .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10);
        searchResults.length < 1
          ? (this.searchIsEmpty = true)
          : (this.searchIsEmpty = false);
        return term.length < 1 ? [] : searchResults;
      })
    );
}
