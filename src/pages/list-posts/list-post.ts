import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';

import {Post} from '../../models/post';
import {Posts} from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-post.html'
})

export class ListPostPage {
  public currentPosts: Post[];

  constructor(public navCtrl: NavController, public posts: Posts, public modalCtrl: ModalController) {
    this.currentPosts = [];
    this.updatePosts()
  }

  updatePosts() {
    this.posts.fetchAll().subscribe((posts) => {
      this.currentPosts = posts
    })
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
    * Like a post
    */
   likePost(post: Post) {
     console.log("likePost: ", post);
     this.posts.like(post)
     this.updatePosts()
     };

     /**
     * Unlike a post
     */
    unlikePost(post: Post) {
      console.log("unlikePost: ", post);
      this.posts.unlike(post)
      this.updatePosts()
      };
}
