import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes, withEnabledBlockingInitialNavigation } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { CompareComponent } from './components/compare/compare.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { VideoGamesComponent } from './components/video-games/video-games.component';
import { VideoGameDetailComponent } from './components/video-game-detail/video-game-detail.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PendingGamesComponent } from './components/pending-games/pending-games.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageVideoGamesComponent } from './components/manage-video-games/manage-video-games.component';
import { ManageReviewsComponent } from './components/manage-reviews/manage-reviews.component';
import { AuthGuard } from './guards/auth.guard';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { CookiesPolicyComponent } from './components/cookies-policy/cookies-policy.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'video-games', component: VideoGamesComponent },
  { path: 'video-game/:id', component: VideoGameDetailComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'pending-games', component: PendingGamesComponent, canActivate: [AuthGuard] },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'manage-video-games', component: ManageVideoGamesComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'manage-reviews', component: ManageReviewsComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'cookies-policy', component: CookiesPolicyComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: '**', redirectTo: '' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
  ],
};
