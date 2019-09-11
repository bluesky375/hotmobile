import { Component } from '@angular/core';
import { PopoverController,MenuController  } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
/**
 * Generated class for the MainHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'main-header',
  templateUrl: 'main-header.html'
})
export class MainHeaderComponent {
  constructor(public popoverCtrl: PopoverController,public menuCtrl: MenuController) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }
 
  openMenu() {
   this.menuCtrl.open();
   }
 
   closeMenu() {
     this.menuCtrl.close();
   }
 
   toggleMenu() {
     //console.log(111);
     this.menuCtrl.toggle();
   }

}
