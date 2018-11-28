import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListTopicPage } from './list-topics';

@NgModule({
  declarations: [
    ListTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(ListTopicPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListTopicPage
  ]
})
export class ListTopicPageModule { }
