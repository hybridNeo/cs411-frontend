import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListPostPage } from './list-post';

@NgModule({
  declarations: [
    ListPostPage,
  ],
  imports: [
    IonicPageModule.forChild(ListPostPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListPostPage
  ]
})
export class ListPostPageModule { }
