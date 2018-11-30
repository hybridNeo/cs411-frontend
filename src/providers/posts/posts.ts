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
    this.storage.get('response').then((val: any) => {
      let user_id = -1;
      if (val) {
        user_id = val.user.user_id;
      }
      console.log(val);
      console.log(val.user.user_id);
      this.fetchAllForUser(user_id).subscribe()
    });
  }

  rec(userid) {
    return this.api.get('recommend/'+userid).map((res: any) => {
      return res.flatMap(function (post) {
        // console.log(post)

        
        return new Post(post.post_id, post.content, post.user_id, post.title, post.description, post.topics, post.likedBy)
      })
    }).map((res) => {
      this.posts = res;
      return res
    }).catch(res => Observable.throw(res));
}

  fetchAllForUser(user_id: Number) {
      return this.api.get('posts', {user_id: user_id}).map((res: any) => {
        return res.flatMap(function (post) {
          // console.log(post)
          if (post.topics.length > 0 && post.topics[0].topic == 'ml') {
            return new Post(post.post_id, post.content, post.user_id, post.title,
              post.description, post.topics, post.likedBy, "assets/img/ml.png")
          } else if (post.topics.length > 0 && post.topics[0].topic == 'distributed systems') {
            return new Post(post.post_id, post.content, post.user_id, post.title, post.description, post.topics, post.likedBy, "assets/img/ds.png")
          }
          return new Post(post.post_id, post.content, post.user_id, post.title, post.description, post.topics, post.likedBy)
        })
      }).map((res) => {
        this.posts = res;
        return res
      }).catch(res => Observable.throw(res));
  }

  search(params?: any) {
    if (!params) {
      return this.posts;
    }

    return this.api.get('search?query=' + params.title).map((res: any) => {
      return res.flatMap(function (post) {
        console.log(post);
        return new Post(post.post_id, post.content, post.user_id, post.title,
          post.description, post.topics, post.likedBy)
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
        this.posts.splice(0, 0, new Post(p.post_id, p.content, p.user_id, p.title));
        console.log(this.posts);
      }
    }, (err) => {
      console.error('ERROR', err);
    });

    return seq
  }

  author(post: Post) {
    return this.storage.get('response').then((val: any) => {
      console.log(val);
      console.log(val.user);
      return val.user.getUser(post.user_id).subscribe((resp: any) => {
        return resp
      });
    });

  }

  like(post: Post) {
    return this.storage.get('response').then((val) => {
      console.log(val);
      var user_id = val.user.user_id;
      console.log("Liking ", post)
      if (post.likedBy == true) {
        var body = {
          post_id: post.post_id
        };
        return this.api.post('user-post-likes/' + user_id, body).subscribe()
      } else {
        return this.api.delete('user-post-likes/' + user_id + '?post_id=' + post.post_id).subscribe()
      }
    })

  }

  delete(post: Post) {
    this.api.delete('post/' + post.post_id).map((res: any) => {
      if (res.success) {
        this.posts.splice(this.posts.indexOf(post), 1);
      }
    }).subscribe()
  }
}
