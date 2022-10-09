import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { ViewCommunitySubredditComponent } from './community-sidebar-right/view-community-subreddit/view-community-subreddit.component';
import { SubredditComponent } from './create-subreddit/subreddit.component';
import { FeedComponent } from './feed/feed.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostByUserComponent } from './post-by-user/post-by-user.component';
import { ViewCommunityPageComponent } from './view-community-page/view-community-page.component';

export const routes: Routes = [
  {
    path: '',
    //children: [{ path: '', component: AuthenticationComponent }],
    component: AuthenticationComponent,
  },

  {
    path: 'feed',
    component: FeedComponent,
    children: [
      {
        path: 'create',
        component: SubredditComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: ':feed/new-post',
    component: NewPostComponent,
    canActivate: [AuthGuard],
  },
  { path: 'listViewCommunity', component: ViewCommunitySubredditComponent },
  {
    path: 'r/:communityPage',
    children: [
      { path: ':id', component: ViewCommunityPageComponent, pathMatch: 'full' },
      {
        path: 'community/:postId',
        component: ViewCommunityPageComponent,
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'post', component: PostByUserComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
