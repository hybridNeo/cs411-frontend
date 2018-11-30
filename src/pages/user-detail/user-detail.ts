import {Component} from '@angular/core';
 import {IonicPage, NavController, NavParams} from 'ionic-angular';

 import {Users} from '../../providers';
 import {User} from '../../models/user';

 @IonicPage()
 @Component({
   selector: 'page-item-detail',
   templateUrl: 'user-detail.html'
 })
 export class UserDetailPage {
   user: User;

   constructor(public navCtrl: NavController, navParams: NavParams, users: Users) {
     console.log(navParams.get('user'));
     this.user = navParams.get('user');
   }

 }
