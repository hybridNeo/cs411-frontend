import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController} from 'ionic-angular';

import {Topic} from '../../models/topic';
import {Topics} from '../../providers';

@IonicPage()
@Component({
  selector: 'page-list-topic',
  templateUrl: 'list-topic.html'
})

export class ListTopicPage {
  public currentTopics: Topic[];

  constructor(public navCtrl: NavController, public topics: Topics, public modalCtrl: ModalController) {
    this.currentTopics = [];
    this.updateTopics()
  }

  updateTopics() {
    this.topics.fetchAll().subscribe((topics) => {
      this.currentTopics = topics
    })
  }

  /**
   * The view loaded, let's query our topics for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new topic. This shows our TopicCreatePage in a
   * modal and then adds the new topic to our data source if the user created one.
   */
  createTopic() {
    let createModal = this.modalCtrl.create('TopicCreatePage');
    createModal.onDidDismiss(topic => {
      this.updateTopics()
    });
    createModal.present();
  }

  /**
   * Delete a topic from the list of topics
   */
  deleteTopic(topic: Topic) {
    this.topics.delete(topic);
  }

  /**
   * Navigate to the detail page for this topic.
   */
  openTopic(topic: Topic) {
    console.log("openTopic: ", topic);
    this.navCtrl.push('TopicDetailPage', {
      topic: topic
    });
    };

    /**
    * Like a topic
    */
   likeTopic(topic: Topic) {
     console.log("likeTopic: ", topic);
     this.topics.like(topic)
     //this.updateTopics()
    };

     /**
     * Unlike a topic
     */
    unlikeTopic(topic: Topic) {
      console.log("unlikeTopic: ", topic);
      this.topics.unlike(topic)
      this.updateTopics()
      };
}
