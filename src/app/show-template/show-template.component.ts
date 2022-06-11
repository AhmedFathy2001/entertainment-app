import { Component, Input, OnInit } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Show } from '../show.model';
import { ShowsService } from '../shows.service';

@Component({
  selector: 'app-show-template',
  templateUrl: './show-template.component.html',
  styleUrls: ['./show-template.component.css'],
})
export class ShowTemplateComponent implements OnInit {
  isHovering: boolean = false;
  @Input() show!: Show;

  bookmark() {
    this._showsService.bookmarkedShow(this.show);
  }

  constructor(private _showsService: ShowsService) {}

  ngOnInit(): void {}
}
