import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ListUsersPage } from './list-users';

@NgModule({
  declarations: [
    ListUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ListUsersPage),
    TranslateModule.forChild()
  ],
  exports: [
    ListUsersPage
  ]
})
export class ListUsersPageModule {}
