import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {Posts} from '../../providers';
import {Post} from '../../models/post'

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'post-detail.html'
})
export class PostDetailPage {
  post: Post;

  constructor(public navCtrl: NavController, navParams: NavParams, posts: Posts) {
    console.log(navParams.get('post'))
    this.post = navParams.get('post')
  }

}
