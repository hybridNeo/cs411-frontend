import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, Platform} from 'ionic-angular';

import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';

import {MainPage} from '../';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController, translate: TranslateService, public platform: Platform, private storage: Storage) {
    this.storage.get('respons').then((response) => {
      this.navCtrl.setRoot(MainPage, {}, {
        animate: true,
        direction: 'forward'
      })
    }, () => {
      this.dir = platform.dir();
      translate.get(["TUTORIAL_SLIDE1_TITLE",
        "TUTORIAL_SLIDE1_DESCRIPTION",
        "TUTORIAL_SLIDE2_TITLE",
        "TUTORIAL_SLIDE2_DESCRIPTION",
        "TUTORIAL_SLIDE3_TITLE",
        "TUTORIAL_SLIDE3_DESCRIPTION",
      ]).subscribe(
        (values) => {
          console.log('Loaded values', values);
          this.slides = [
            {
              title: "Welcome to PeerLearn",
              description: "PeerLearn is a peer to peer learning platform made by students for students.",
              image: 'https://pjp-eu.coe.int/documents/9209485/9389177/Learn+shutterstock.jpg/c41f5581-2c03-84db-ca3e-66b6b016552c',
            },
            {
              title: "Create Content",
              description: "Easy to create tutorials and quizzes",
              image: 'assets/img/ica-slidebox-img-2.png',
            },
            {
              title: "Learn on the go",
              description: "Learning has never been like this before",
              image: 'assets/img/ica-slidebox-img-3.png',
            }
          ];
        })
    })
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage', {}, {
      animate: true,
      direction: 'forward'
    });
  }


  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
