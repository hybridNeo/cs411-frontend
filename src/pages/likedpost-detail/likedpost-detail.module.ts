import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { LikedPostDetailPage } from './likedpost-detail';

@NgModule({
  declarations: [
    LikedPostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LikedPostDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    LikedPostDetailPage
  ]
})
export class LikedPostDetailPageModule { }
