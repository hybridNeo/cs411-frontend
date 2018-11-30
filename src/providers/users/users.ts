import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import {Api} from '../api/api';
import {Observable} from "rxjs";
import {Storage} from '@ionic/storage';
import {filter} from 'rxjs/operators';

@Injectable()
export class Users {
  public users: User[];

  constructor(public api: Api, private storage: Storage) {
    this.users = [];
  }

  fetchAllForUser(user_id: Number) {
    let body = {
      user_id: user_id
    }
    return this.api.get('users', body).map((res: any) => {
      return res.map(function (user: any) {
        return new User(user.user_id, user.username, user.bio, user.follows)
      })
    }).map((res) => {
      this.users = res;
      return res
    }).catch(res => Observable.throw(res))
  }

  find(user_id) {
    return this.api.get('/users/' + user_id).map((res: any) => {
      return new User(res.user_id, res.username, res.bio)
    })
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
    })
  }

  fetchFollowing(user_id) {
    return this.api.get('follows/' + user_id).map((users: any) => {
      return users.map((user: User) => {
        return new User(user.user_id, user.username, user.bio)
      })
    })
  }

  query(params?: any) {
    if (!params) {
      return this.users;
    }

    return this.users.filter((user) => {
      console.log(user);
      for (let key in params) {
        let field = user[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return user;
        } else if (field == params[key]) {
          return user;
        }
      }
      return null;
    });
  }

  post(form: any) {
    console.log("Sending ", form);
    let seq = this.api.post('users', form).share();

    seq.subscribe((res: any) => {
      if (res.success == true) {
        console.log("POST user success: Adding ", res);
        var u = res.user;
        this.users.push(new User(u.user_id, u.username, u.bio, u.likedBy));
      }
    }, (err) => {
      console.error('ERROR', err);
    });

    return seq
  }

  follow(user: User) {
    return this.storage.get('response').then((val) => {
      console.log(val);
      var my_user_id = val.user.user_id;
      console.log("Following ", val.user)
      if (user.follows == true) {
        let body = {
          follows_id: user.user_id
        };
        return this.api.post('follows/' + my_user_id, body).subscribe()
      } else {
        return this.api.delete('follows/' + my_user_id + '?follows_id=' + user.user_id).subscribe()
      }
    });
  }


  delete(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
  }
}
