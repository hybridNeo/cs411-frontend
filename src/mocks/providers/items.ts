import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../../providers/api/api';


@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };



  constructor(public api: Api) {
    let items = [];
    // let items = [
    //   {
    //     "name": "Burt Bear",
    //     "profilePic": "assets/img/speakers/bear.jpg",
    //     "about": "Burt is a Bear."
    //   },
    //   {
    //     "name": "Charlie Cheetah",
    //     "profilePic": "assets/img/speakers/cheetah.jpg",
    //     "about": "Charlie is a Cheetah."
    //   },
    //   {
    //     "name": "Donald Duck",
    //     "profilePic": "assets/img/speakers/duck.jpg",
    //     "about": "Donald is a Duck."
    //   },
    //   {
    //     "name": "Eva Eagle",
    //     "profilePic": "assets/img/speakers/eagle.jpg",
    //     "about": "Eva is an Eagle."
    //   },
    //   {
    //     "name": "Ellie Elephant",
    //     "profilePic": "assets/img/speakers/elephant.jpg",
    //     "about": "Ellie is an Elephant."
    //   },
    //   {
    //     "name": "Molly Mouse",
    //     "profilePic": "assets/img/speakers/mouse.jpg",
    //     "about": "Molly is a Mouse."
    //   },
    //   {
    //     "name": "Paul Puppy",
    //     "profilePic": "assets/img/speakers/puppy.jpg",
    //     "about": "Paul is a Puppy."
    //   }
    // ];
    let seq = this.api.get('posts').share();

    seq.subscribe((res: any) => {
      console.log('here' + res);

      // If the API returned a successful response, mark the user as logged in

        for (let a of res) {
          let item = {"about":"pup","name":"", "profilePic": "assets/img/speakers/puppy.jpg"};
          console.log(a);
          item.about = a.content;
          item.name = a.title;
          console.log(item);
          this.items.push(new Item(item));
        }

    }, err => {
      console.error('ERROR', err);
    });


  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: any) {
    console.log('here 2');
    console.log(item);
    let post_info = {
      user_id: 14,
      title: 'test',
      content: 'content'
    };
    let seq = this.api.post('posts', item.inner).share();

    seq.subscribe((res: any) => {
      console.log('here' + res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
