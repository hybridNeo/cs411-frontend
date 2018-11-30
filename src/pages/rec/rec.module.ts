import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { RecPage } from './rec';

@NgModule({
  declarations: [
    RecPage,
  ],
  imports: [
    IonicPageModule.forChild(RecPage),
    TranslateModule.forChild()
  ],
  exports: [
    RecPage
  ]
})
export class RecPageModule {}
