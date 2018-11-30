import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import {Post} from '../../models/post';
import {Posts} from '../../providers';
import {User} from '../../providers';

import { Storage } from '@ionic/storage';


/**
 * Generated class for the RecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rec',
  templateUrl: 'rec.html',
})

export class RecPage {
  public currentPosts: Post[];

  constructor(public navCtrl: NavController, public posts: Posts,
    private storage: Storage,
    public modalCtrl: ModalController) {
    this.currentPosts = [];
    console.log('sdsd')
    this.updatePosts();
  }
  updatePosts() {
    this.storage.get('response').then((val  : any) => {
      console.log(val);
      // this.posts.rec(val.user.user_id).subscribe((posts)) => {
      //   this.currentPosts = posts;
      // })
      console.log('hereeee');
      this.posts.rec(val.user.user_id).subscribe((posts) => {
        console.log("here" + val.user.user_id);
        console.log(posts);
        this.currentPosts = posts
      })

    });
  }
  // updatePosts() {
  //   this.posts.fetchAll().subscribe((posts) => {
  //     this.currentPosts = posts
  //   })
  // }
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
    let createModal = this.modalCtrl.create('RecPage');
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
