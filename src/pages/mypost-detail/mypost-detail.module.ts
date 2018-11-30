import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MyPostDetailPage } from './mypost-detail';

@NgModule({
  declarations: [
    MyPostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPostDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    MyPostDetailPage
  ]
})
export class MyPostDetailPageModule { }
