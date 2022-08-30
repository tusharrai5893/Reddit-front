import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { FeedComponent } from './feed/feed.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'feed', component: FeedComponent, pathMatch: 'full' },
  { path: 'auth', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
