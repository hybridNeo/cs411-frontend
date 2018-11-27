import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { PostCreatePage } from './post-create';

@NgModule({
  declarations: [
    PostCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(PostCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    PostCreatePage
  ]
})
export class ItemCreatePageModule { }
