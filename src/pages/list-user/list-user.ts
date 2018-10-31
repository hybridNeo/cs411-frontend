import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicProvider } from '../../providers/ionic/ionic';

/**
 * Generated class for the ListUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-user',
  templateUrl: 'list-user.html',
})
export class ListUserPage {
  users: any;
  getUsers() {
      this.restProvider.getUsers()
      .then(data => {
        this.users = data;
        console.log(this.users);
      });
    }
  constructor(public navCtrl: NavController, public restProvider: IonicProvider, public navParams: NavParams) {

    this.getUsers();

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ListUserPage');
  }

}
