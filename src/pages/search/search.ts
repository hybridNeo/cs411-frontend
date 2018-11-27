import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Post } from '../../models/post';
import { Posts } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentPosts: Post[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public posts: Posts) {
    this.currentPosts = []
  }

  /**
   * Perform a service for the proper posts.
   */
  getPosts(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentPosts = [];
      return;
    }
    this.currentPosts = this.posts.query({
      title: val
    });
    return;
  }

  /**
   * Navigate to the detail page for this post.
   */
  openPost(post: Post) {
    this.navCtrl.push('PostDetailPage', {
      post: post
    });
  }

}
