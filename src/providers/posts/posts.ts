import {Injectable} from '@angular/core';
import {Post} from '../../models/post';
import {User} from '../../models/user';

import {Api} from '../api/api';
import {Observable} from "rxjs";
import {Storage} from '@ionic/storage';

@Injectable()
export class Posts {
  public posts: Post[];

  constructor(public api: Api, private storage: Storage) {
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

  author(post: Post) {

     return this.storage.get('response').then((val) => {
        console.log(val);
        //var author_user = val.user.getUser(post.user_id).subscribe((resp : any) => {
        //    return resp
        // });
        //console.log("Author ", author_user)
        //return author_user
    });

    }

  like(post: Post) {

    return this.storage.get('response').then((val) => {
        console.log(val);
        var user_id = val.user.user_id;
        console.log("Liking ", post)
        return this.api.post('user-post-likes', user_id, post.post_id)
    });

  }

  delete(post: Post) {
    this.posts.splice(this.posts.indexOf(post), 1);
  }
}
