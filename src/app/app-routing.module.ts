import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { FeedComponent } from './feed/feed.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';

export const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  { path: 'feed', component: FeedComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'new-post', component: NewPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
