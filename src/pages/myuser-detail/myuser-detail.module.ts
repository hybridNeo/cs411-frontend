import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { MyUserDetailPage } from './myuser-detail';

@NgModule({
  declarations: [
    MyUserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyUserDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    MyUserDetailPage
  ]
})
export class MyUserDetailPageModule {}
