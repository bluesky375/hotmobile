import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the OquestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-oquestion',
  templateUrl: 'oquestion.html',
})
export class OquestionPage {
  reqId:string;
  cId:string;
  gen_que:any;
  workflowId:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController) {
    this.reqId=navParams.get('reqId');  
    this.cId=navParams.get('cId'); 
    this.gen_que=navParams.get('gen_que');
    this.workflowId=navParams.get('workflowId'); 
  //  console.log("this.detail1",this.detail1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OquestionPage');
  }
  goBack(){
    this.viewCtrl.dismiss();
  }
}
