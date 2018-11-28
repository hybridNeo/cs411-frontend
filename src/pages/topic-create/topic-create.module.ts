import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TopicCreatePage } from './topic-create';

@NgModule({
  declarations: [
    TopicCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TopicCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    TopicCreatePage
  ]
})
export class TopicCreatePageModule { }
