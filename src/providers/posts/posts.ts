import {Injectable} from '@angular/core';
import {Post} from '../../models/post';
import {Api} from '../api/api';
import {Observable} from "rxjs";

@Injectable()
export class Posts {
  public posts: Post[];

  constructor(public api: Api) {
    this.posts = [];
  }

  fetchAll() {
    return this.api.get('posts').map((res: any) => {
      return res.flatMap(function (post) {
        return new Post(post.post_id, post.content, post.user_id, post.title, post.description)
      })
    }).map((res) => {
      this.posts = res;
      return res
    }).catch(res => Observable.throw(res));
  }

  query(params?: any) {
    if (!params) {
      return this.posts;
    }

    return this.posts.filter((post) => {
      console.log(post);
      for (let key in params) {
        let field = post[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return post;
        } else if (field == params[key]) {
          return post;
        }
      }
      return null;
    });
  }

  post(form: any) {
    console.log("Sending ", form);
    let seq = this.api.post('posts', form).share();

    seq.subscribe((res: any) => {
      if (res.success == true) {
        console.log("POST post success: Adding ", res);
        var p = res.post;
        this.posts.push(new Post(p.post_id, p.content, p.user_id, p.title));
      }
    }, (err) => {
      console.error('ERROR', err);
    });

    return seq
  }

  like(post: Post) {
    // TODO: add POST method for PostUserLikes (increment)
    console.log("Liking ", post)
    return this.api.post('post-user-likes', post.post_id)
  }

  unlike(post: Post) {
    // TODO: add POST method for PostUserLikes (decrement)
    console.log("UnLiking ", post)
    return this.api.post('post-user-likes', post.post_id)
   }

  delete(post: Post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }
}
