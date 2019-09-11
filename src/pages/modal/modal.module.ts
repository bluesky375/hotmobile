import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPage } from './modal';
import { SearchPipe } from '../../pipes/search';
@NgModule({
  declarations: [
    ModalPage,
    SearchPipe
  ],
  imports: [
    IonicPageModule.forChild(ModalPage),
  ],
})
export class ModalPageModule {}
