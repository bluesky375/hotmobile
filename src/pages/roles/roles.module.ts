import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RolesPage } from './roles';
import { PopoverComponent } from '../../components/popover/popover';

@NgModule({
  declarations: [
    RolesPage,
  ],
  imports: [
    IonicPageModule.forChild(RolesPage),
    PopoverComponent
  ],
})
export class RolesPageModule {}
