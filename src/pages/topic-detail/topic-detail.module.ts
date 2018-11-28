import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TopicDetailPage } from './topic-detail';

@NgModule({
  declarations: [
    TopicDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    TopicDetailPage
  ]
})
export class TopicDetailPageModule { }
