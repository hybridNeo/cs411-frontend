import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';

import {User} from '../../models/user';
import {Users} from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-users',
  templateUrl: 'list-users.html',
})
export class ListUsersPage {

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
    * Prompt the user(admin user) to add a new user. This shows our UserCreatePage in a
    * modal and then adds the new user to our data source if created one.
    */
   createUser() {
     let createModal = this.modalCtrl.create('UserCreatePage');
     createModal.onDidDismiss(user => {
       this.updateUsers()
     });
     createModal.present();
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

     /**
     * Follow a user
     */
    followUser(user: User) {
      console.log("followUser: ", user);
      this.users.follow(user)

       user.follows = !user.follows
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
