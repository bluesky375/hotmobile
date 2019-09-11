import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the HomemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homemodal',
  templateUrl: 'homemodal.html',
})
export class HomemodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomemodalPage');
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
}
