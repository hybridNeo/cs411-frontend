import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

import {Post} from '../../models/post';
import {Users} from '../../providers';
import {Posts} from '../../providers';
import {User} from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'likedpost-detail.html'
})

export class LikedPostDetailPage {
  currentPosts: Post[];

  constructor(public navCtrl: NavController, navParams: NavParams, public posts: Posts, public modalCtrl: ModalController,) {
    this.currentPosts = [];
    this.updatePosts(navParams.get('user_id'));
  }

  updatePosts(user_id: Number) {
    return this.posts.fetchAllLikedByUser(user_id).subscribe((posts: Post[]) => {
      this.currentPosts = posts
    })
  }

  /**
   * The view loaded, let's query our posts for the list
   */
  ionViewDidLoad() {
  }


  /**
   * Navigate to the detail page for this post.
   */
  openPost(post: Post) {
    console.log("openPost: ", post);
    this.navCtrl.push('PostDetailPage', {
      post: post
    });
  };

  /**
   * Navigate to the detail page for the author of this post.
   */
  openAuthor(post: Post) {
    console.log("openAuthor: ", post);
    var user_author = this.posts.author(post)
    this.navCtrl.push('UserDetailPage', {
      user: user_author
    });

  };

  /**
   * Like a post
   */
  likePost(post: Post) {
    console.log("likePost: ", post);
    post.likedBy = !post.likedBy;
    console.log("likedBy: ", post.likedBy)
    this.posts.like(post);
    // this.updatePosts()
  };

}
