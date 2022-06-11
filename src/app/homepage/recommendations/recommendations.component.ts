import { Component, OnInit } from '@angular/core';
import { Show } from 'src/app/show.model';
import { ShowsService } from 'src/app/shows.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
  isHovering: boolean = false;
  recommendations!: Show[];
  constructor(private _showsService: ShowsService) {}

  async ngOnInit(): Promise<void> {
    (await this._showsService.getHomePageContent(false)).subscribe(
      (shows: Show[]) => (this.recommendations = shows)
    );
  }
}
