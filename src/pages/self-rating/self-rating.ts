import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';


/**
 * Generated class for the SelfRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-self-rating',
  templateUrl: 'self-rating.html',
})
export class SelfRatingPage {
  reqId:string;
  cId:string;
  ratings:any=[{}];
  loadProgress : number;
  workflowId:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,) {
      this.reqId=navParams.get('reqId');  
      this.cId=navParams.get('cId'); 
      this.ratings=navParams.get('ratings');
      this.workflowId=navParams.get('workflowId'); 
      console.log(this.ratings);
      this.loadProgress = this.ratings[0].score;
      console.log(this.loadProgress);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelfRatingPage');
  }
  goBack(){
    this.viewCtrl.dismiss();
  }
  
  
}
