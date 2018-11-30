import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Post } from '../../models/post';
import { Posts } from '../../providers';
import { User } from '../../models/user';
import { Users } from '../../providers';
import { Topic } from '../../models/topic';
import { Topics } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentPosts: Post[] = [];
  currentUsers: User[] = [];
  currentTopics: Topic[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public posts: Posts, public users: Users, public topics: Topics) {
    this.currentPosts = []
    this.currentUsers = []
    this.currentTopics = []
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
     this.posts.search({
        title: val
    }).subscribe((res: Post[]) => {
      this.currentPosts = res;
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

    /**
    * Perform a service for the proper users.
    */
   getUsers(ev) {
     let val = ev.target.value;
     if (!val || !val.trim()) {
       this.currentUsers = [];
       return;
     }
     this.currentUsers = this.users.query({
       username: val
     });
     return;
   }

   /**
    * Navigate to the detail page for this user.
    */
   openBio(user: User) {
     this.navCtrl.push('UserDetailPage', {
       user: user
     });
   }

   /**
    * Perform a service for the proper topics
    */
   getTopics(ev) {
     let val = ev.target.value;
     if (!val || !val.trim()) {
       this.currentTopics = [];
       return;
     }
     this.currentTopics = this.topics.query({
       topic: val
     });
     return;
   }

   /**
    * Navigate to the detail page for this topic.
    */
   openTopic(topic: Topic) {
     this.navCtrl.push('TopicDetailPage', {
       topic: topic
     });
   }
}
