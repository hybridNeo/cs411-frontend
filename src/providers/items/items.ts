import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class Items {
  _item : any;
  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }
  post_info = {
    user_id: 1,
    title: 'test',
    content: 'content'
  }

  add(item: any) {
    console.log('here 2');
    console.log(item);
    let seq = this.api.post('posts', item.inner).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  delete(item: any) {
  }

}
