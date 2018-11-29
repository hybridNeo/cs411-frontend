import {Injectable} from '@angular/core';
import {Post} from '../../models/post';
import {User} from '../../providers';

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
        // console.log(post)
        if(post.topics.length > 0 && post.topics[0].topic == 'ml'){

          return new Post(post.post_id, post.content, post.user_id, post.title,
             post.description, post.topics, "assets/img/ml.png")
        } else if(post.topics.length > 0 && post.topics[0].topic == 'distributed systems'){

          return new Post(post.post_id, post.content, post.user_id, post.title,
             post.description, post.topics, "assets/img/ds.png")
        }

        return new Post(post.post_id, post.content, post.user_id, post.title,
          post.description, post.topics)
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
        console.log(this.posts);
        this.posts.unshift(new Post(p.post_id, p.content, p.user_id, p.title));
        console.log(this.posts);
      }
    }, (err) => {
      console.error('ERROR', err);
    });

    return seq
  }

  author(post: Post) {

     return this.storage.get('response').then((val : any) => {
        console.log(val);
        console.log(val.user);
        return val.user.getUser(post.user_id).subscribe((resp : any) => {
            return resp
         });
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
