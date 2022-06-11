import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthScreenComponent } from './auth-screen/auth-screen.component';
import { AuthGuard } from './auth-screen/guard/auth.guard';
import { VerifyEmailComponent } from './auth-screen/verify-email/verify-email.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { MoviesComponent } from './movies/movies.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SeriesComponent } from './series/series.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomepageComponent,
        data: { animation: 'home' },
      },
      {
        path: 'movies',
        component: MoviesComponent,
        data: { animation: 'movies' },
      },
      {
        path: 'tv-series',
        component: SeriesComponent,
        data: { animation: 'series' },
      },
      {
        path: 'bookmarks',
        component: BookmarksComponent,
        data: { animation: 'bookmarks' },
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: { animation: 'profile' },
      },
      {
        path: 'search-result/:search',
        component: SearchResultComponent,
        data: { animation: 'search' },
      },
    ],
    canActivate: [AuthGuard],
  },

  {
    path: 'login',
    component: AuthScreenComponent,
    data: { animation: 'Login' },
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
    data: { animation: 'verify-email' },
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    data: { animation: 'error' },
  },
  {
    path: '**',
    redirectTo: 'not-found',
    data: { animation: 'error' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
