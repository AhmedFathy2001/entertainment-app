import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Show } from './show.model';

@Injectable({
  providedIn: 'root',
})
export class ShowsService {
  // private allShowsWithoutBookmarks!: Observable<Show[]>;
  private allShows!: Observable<Show[]>;
  bookmarks!: Observable<Show[]>;
  showTitles!: string[];
  uid = JSON.parse(localStorage.getItem('user')!)['uid'];

  constructor(private _http: HttpClient, private afs: AngularFirestore) {
    this.loadFromServer();
  }

  private loadFromServer() {
    this.allShows = this._http.get<Show[]>(
      'https://entertainment-c428f-default-rtdb.europe-west1.firebasedatabase.app/allShows.json'
    );
    // this.allShows = this.loadAllBookmarksFromServer();
  }

  // private loadAllBookmarksFromServer() {

  //   const userBookmarks = (
  //     this.afs.firestore.collection('users').doc(this.uid).get()
  //   ).then(res=>{
  //     this.bookmarks = this.allShowsWithoutBookmarks.pipe(
  //       map((shows) =>
  //         shows.filter((show) => {
  //           res.data()!['bookmarks'].indexOf(show.id) > -1
  //             ? (show.isBookmarked = true)
  //             : (show.isBookmarked = false);
  //           return res.data()!['bookmarks'].indexOf(show.id) > -1;
  //         })
  //       )
  //     );
  //   });

  //   console.log(this.bookmarks);

  //   return this.bookmarks;
  // }

  async getHomePageContent(type: boolean): Promise<Observable<Show[]>> {
    const userBookmarks = (
      await this.afs.firestore.collection('users').doc(this.uid).get()
    ).data();

    return this.allShows.pipe(
      map((shows) =>
        shows.filter((show) => {
          userBookmarks!['bookmarks'].indexOf(show.id) > -1
            ? (show.isBookmarked = true)
            : (show.isBookmarked = false);
          return show.isTrending == type;
        })
      )
    );
  }

  async getShows(category: string): Promise<Observable<Show[]>> {
    const userBookmarks = (
      await this.afs.firestore.collection('users').doc(this.uid).get()
    ).data();

    return this.allShows.pipe(
      map((shows) =>
        shows.filter((show) => {
          userBookmarks!['bookmarks'].indexOf(show.id) > -1
            ? (show.isBookmarked = true)
            : (show.isBookmarked = false);
          return show.category.toLowerCase() == category.toLowerCase();
        })
      )
    );
  }

  async getBookmarks(category: string): Promise<Observable<Show[]>> {
    const userBookmarks = (
      await this.afs.firestore.collection('users').doc(this.uid).get()
    ).data();
    this.bookmarks = this.allShows.pipe(
      map(
        (shows) =>
          shows.filter((show) => {
            userBookmarks!['bookmarks'].indexOf(show.id) > -1
              ? (show.isBookmarked = true)
              : (show.isBookmarked = false);
            return (
              userBookmarks!['bookmarks'].indexOf(show.id) > -1 &&
              show.category.toLowerCase() == category.toLowerCase()
            );
          })
        // shows.filter(
        //   (show) =>
        //     show.isBookmarked == true &&
        //     show.category.toLowerCase() == category.toLowerCase()
        // )
      )
    );
    console.log(this.bookmarks);

    return this.bookmarks;
  }

  getSearchResults(term: string): Observable<Show[]> {
    return this.allShows.pipe(
      map((shows) =>
        shows.filter((show) =>
          show.title.toLowerCase().includes(term.toLowerCase())
        )
      )
    );
  }

  // getBookmarks(category: string): Show[] {
  //   return this.shows.filter(
  //     (show) =>
  //       show.isBookmarked == true &&
  //       show.category.toLowerCase() == category.toLowerCase()
  //   );
  // }

  // getSearchResults(term: string): Show[] {
  //   return this.shows.filter((show) =>
  //     show.title.toLowerCase().includes(term.toLowerCase())
  //   );
  // }

  getTitles(): Observable<Show[]> {
    return this.allShows.pipe();
  }

  async bookmarkedShow(currentShow: Show) {
    const userBookmarks = (
      await this.afs.firestore.collection('users').doc(this.uid).get()
    ).data();

    await this.afs.firestore
      .collection('users')
      .doc(this.uid)
      .update({
        bookmarks: currentShow.isBookmarked
          ? userBookmarks!['bookmarks'].filter(
              (id: string) => id.toString() !== currentShow.id.toString()
            )
          : [...userBookmarks!['bookmarks'], currentShow.id],
      })
      .then(() => {
        currentShow.isBookmarked = !currentShow.isBookmarked;
      });

    // this._http
    //   .put<Observable<Show[]>>(
    //     'https://entertainment-c428f-default-rtdb.europe-west1.firebasedatabase.app/allShows/' +
    //       currentShow.id +
    //       '.json',
    //     { ...currentShow }
    //   )
    //   .subscribe((data) => (this.bookmarks = data));
  }

  // bookmarkedShow(category: string, show: Show) {
  //   this.getBookmarks(category).subscribe(
  //     (shows) => (this.bookmarkedShows = shows)
  //   );
  //   let bookmark = this.bookmarkedShows.find(
  //     (showw) => showw == show
  //   )?.isBookmarked;
  //   bookmark = !bookmark;
  // }
  // changeBookmarkStatus(show: Show) {
  //   console.log('errrr');

  //   let currentShow;
  //   this.allShows.pipe(
  //     map((shows) => {
  //       console.log('ehhhhh');
  //       currentShow = shows.find(
  //         (currentShow) => currentShow == show
  //       )!.isBookmarked;
  //       currentShow == !currentShow;
  //       console.log('hmm');
  //       return currentShow;
  //     })
  //   );
  //   console.log(currentShow);
  // }
}
