import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { SubredditComponent } from './create-subreddit/subreddit.component';
import { FeedComponent } from './feed/feed.component';
import { NewPostComponent } from './new-post/new-post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent },
  {
    path: 'feed',
    component: FeedComponent,
    children: [{ path: 'new-community', component: SubredditComponent }],
  },
  { path: ':feed/new-post', component: NewPostComponent },
  // { path: 'new-community', component: SubredditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
