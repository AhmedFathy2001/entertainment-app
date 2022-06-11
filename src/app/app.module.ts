import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthScreenComponent } from './auth-screen/auth-screen.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragScrollModule } from 'ngx-drag-scroll';
import { HomepageComponent } from './homepage/homepage.component';
import { TrendingComponent } from './homepage/trending/trending.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecommendationsComponent } from './homepage/recommendations/recommendations.component';
import { TrendingShowComponent } from './homepage/trending/trending-show/trending-show.component';
import { ShowTemplateComponent } from './show-template/show-template.component';
import { MoviesComponent } from './movies/movies.component';
import { SeriesComponent } from './series/series.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ShowsContainerTemplateComponent } from './shows-container-template/shows-container-template.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VerifyEmailComponent } from './auth-screen/verify-email/verify-email.component';
import { VerifyEmailBarComponent } from './verify-email-bar/verify-email-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthScreenComponent,
    SearchBarComponent,
    HomepageComponent,
    TrendingComponent,
    NavbarComponent,
    RecommendationsComponent,
    TrendingShowComponent,
    ShowTemplateComponent,
    MoviesComponent,
    SeriesComponent,
    BookmarksComponent,
    PageNotFoundComponent,
    MainComponent,
    SearchResultComponent,
    ShowsContainerTemplateComponent,
    UserProfileComponent,
    VerifyEmailComponent,
    VerifyEmailBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DragScrollModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
