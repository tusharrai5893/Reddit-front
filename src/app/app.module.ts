import { QuillModule } from 'ngx-quill';
import { MyTokenInterceptor } from './token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { FeedComponent } from './feed/feed.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VoteComponent } from './feed/vote/vote.component';
import { PostViewComponent } from './feed/post-view/post-view.component';
import { FamousCommunityComponent } from './community-sidebar-right/famous-community.component';
import { NOTYF, notyfFactory } from './notification';
import { ViewCommunitySubredditComponent } from './community-sidebar-right/view-community-subreddit/view-community-subreddit.component';
import { NewPostComponent } from './new-post/new-post.component';
import { SubredditComponent } from './create-subreddit/subreddit.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    FeedComponent,
    HeaderComponent,
    VoteComponent,
    PostViewComponent,
    FamousCommunityComponent,
    ViewCommunitySubredditComponent,
    NewPostComponent,
    SubredditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    QuillModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyTokenInterceptor,
      multi: true,
    },
    { provide: NOTYF, useFactory: notyfFactory },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
