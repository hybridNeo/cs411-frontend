import {Injectable} from '@angular/core';
import {User} from '../../models/user';
import {Api} from '../api/api';
import {Observable} from "rxjs";
import {Storage} from '@ionic/storage';

@Injectable()
export class Users {
    public users: User[];

    constructor(public api: Api, private storage: Storage) {
        this.users = [];
    }

   fetchAll() {
     return this.api.get('users').map((res: any) => {
       return res.flatMap(function (user) {
         return new User(user.user_id, user.username)
       })
     }).map((res) => {
       this.users = res;
       return res
     }).catch(res => Observable.throw(res));
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
         this.users.push(new User(u.user_id, u.username));
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
         return this.api.post('follows', user.user_id, my_user_id)
     });
   }

   unfollow(user: User) {
    return this.storage.get('response').then((val) => {
          console.log(val);
          var my_user_id = val.user.user_id;
          console.log("UnFollowing ", val.user)
          return this.api.delete('follows', user.user_id)
      });
    }

   delete(user: User) {
     this.users.splice(this.users.indexOf(user), 1);
   }
 }
