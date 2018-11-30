import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../providers';
import { Storage } from '@ionic/storage';

import { Settings } from '../../providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  // Our local settings object
  options: any;

  settingsReady = false;

  form: FormGroup;

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  page: string = 'main';
  pageTitleKey: string = 'SETTINGS_TITLE';
  pageTitle: string;
  public username: string;
  public bio: string;

  subSettings: any = SettingsPage;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    private storage: Storage,
    public user: User,
    public navParams: NavParams,
    public translate: TranslateService) {
      console.log('here');
      this.storage.get('response').then((val  : any) => {
        console.log(val);
        this.username = val.user.username;
        //this.user = val.user;

        console.log(this.user);
        this.user.getUser(val.user.user_id).subscribe((resp : any) => {
          this.bio = resp.bio;
        });
      });

      // username = this.user.username;
      // console.log(username);
  }

  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    };

    switch (this.page) {
      case 'main':
        break;
      case 'profile':
        group = {
          option4: [this.options.option4]
        };
        break;
    }
    this.form = this.formBuilder.group(group);

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.settings.merge(this.form.value);
    });
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({});

    this.page = this.navParams.get('page') || this.page;
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey;

    this.translate.get(this.pageTitleKey).subscribe((res) => {
      this.pageTitle = res;
    })

    this.settings.load().then(() => {
      this.settingsReady = true;
      this.options = this.settings.allSettings;

      this._buildForm();
    });
  }

  ngOnChanges() {
    console.log('Ng All Changes');
    }

    openMyPosts() {
        this.storage.get('response').then((val  : any) => {
            console.log(val);
            var user_id = val.user.user_id; 
            console.log("openMyPosts: ");
            this.navCtrl.push('MyPostDetailPage', {
                user_id: user_id
            });
        });
    };

    openMyUsers() {
         this.storage.get('response').then((val  : any) => {
             console.log(val);
             var user_id = val.user.user_id;
             console.log(this.user);
             console.log("openMyUsers: ");
             this.navCtrl.push('MyUserDetailPage', {
                 user_id: user_id
             });
         });
    };

    openLikedPosts() {
         this.storage.get('response').then((val  : any) => {
             console.log(val);
             var user_id = val.user.user_id;
             console.log(this.user);
             console.log("openLikedPosts: ");
             this.navCtrl.push('LikedPostDetailPage', {
                 user_id: user_id
             });
         });
     };
}
