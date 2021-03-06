import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';

import {Post} from '../../models/post';
import {Posts} from '../../providers';
import {User} from '../../providers';
import {Users} from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-post.html'
})

export class ListPostPage {

  constructor(public navCtrl: NavController, public posts: Posts, public modalCtrl: ModalController, public users: Users) {
    this.updatePosts();
  }

  updatePosts() {
    this.posts.fetchAll()
  }

  /**
   * The view loaded, let's query our posts for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new post. This shows our PostCreatePage in a
   * modal and then adds the new post to our data source if the user created one.
   */
  createPost() {
    let createModal = this.modalCtrl.create('PostCreatePage');
    createModal.onDidDismiss(post => {
      this.updatePosts()
    });
    createModal.present();
  }

  /**
   * Delete an post from the list of posts.
   */
  deletePost(post: Post) {
    this.posts.delete(post);
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
    this.users.find(post.user_id).subscribe((user) => {
      this.navCtrl.push('UserDetailPage', {
        user: user
      });
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
