import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {Topics} from '../../providers';
import {Topic} from '../../models/topic'

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'topic-detail.html'
})
export class TopicDetailPage {
  topic: Topic;

  constructor(public navCtrl: NavController, navParams: NavParams, topic: Topics) {
    console.log(navParams.get('topic'))
    this.topic = navParams.get('topic')
  }

}
