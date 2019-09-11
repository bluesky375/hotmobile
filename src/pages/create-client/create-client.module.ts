import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateClientPage } from './create-client';

@NgModule({
  declarations: [
    CreateClientPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateClientPage),
  ],
})
export class CreateClientPageModule {}
