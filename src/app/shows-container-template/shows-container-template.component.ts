import { Component, Input, OnInit } from '@angular/core';
import { Show } from '../show.model';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-shows-container-template',
  templateUrl: './shows-container-template.component.html',
  styleUrls: ['./shows-container-template.component.css'],
})
export class ShowsContainerTemplateComponent implements OnInit {
  @Input() title!: string;
  @Input() type!: string;
  isHovering: boolean = false;
  shows!: Show[];
  constructor(private _showsService: ShowsService) {}

  async ngOnInit(): Promise<void> {
    (await this._showsService.getShows(this.type)).subscribe(
      (shows) => (this.shows = shows)
    );
  }
}
