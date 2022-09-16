import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostRequestPayload } from 'src/app/dto/post-payload/post-req';
import { environment } from 'src/environments/environment';
import { PostResponsePayload } from 'src/app/dto/post-payload/post-res';

@Injectable({
  providedIn: 'root',
})
export class NewPostService {
  BASE_URL = environment.base_url;

  createNewPost(
    postReqPayload: PostRequestPayload
  ): Observable<PostResponsePayload> {
    return this._http.post<PostResponsePayload>(
      this.BASE_URL + 'post/add-post',
      postReqPayload
    );
  }
  constructor(private _http: HttpClient) {}
}
