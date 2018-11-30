import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';

import {User} from '../../models/user';
import {Users} from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-users',
  templateUrl: 'myuser-detail.html',
})
export class MyUserDetailPage {

  constructor(public navCtrl: NavController, public users: Users, public modalCtrl: ModalController) {
     this.updateUsers()
  }

  updateUsers() {
     this.users.fetchAll()
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


      /*getUsers() {
       *this.restProvider.getUsers().then(data => {
        *this.users = data;
        *console.log(this.users);
      *});
    }*/

    /**constructor(public navCtrl: NavController, public restProvider: IonicProvider, public navParams: NavParams) {
    *
    *this.getUsers();
    *
    }*/

    /**ionViewDidLoad() {
    *console.log('ionViewDidLoad ListUsersPage');
    }*/

}
