import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PostDetailPage } from './post-detail';

@NgModule({
  declarations: [
    PostDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PostDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    PostDetailPage
  ]
})
export class PostDetailPageModule { }
