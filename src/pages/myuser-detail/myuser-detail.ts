import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

import {User} from '../../models/user';
import {Users} from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-users',
  templateUrl: 'myuser-detail.html',
})
export class MyUserDetailPage {
  currentUsers: User[];

  constructor(public navCtrl: NavController, navParams: NavParams, public users: Users, public modalCtrl: ModalController) {
    this.currentUsers = [];
    this.updateUsers(navParams.get('user_id'))
  }

  updateUsers(user_id) {
    this.users.fetchFollowing(user_id).subscribe((users) => {
      this.currentUsers = users
    })
  }

  /**
   * The view loaded, let's query our users for the list
   */
  ionViewDidLoad() {
  }


  /**
   * Navigate to the detail page for this user.
   */
  openBio(user: User) {
    console.log("openUser: ", user);
    this.navCtrl.push('UserDetailPage', {
      user: user
    });
  };

}
