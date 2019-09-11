import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the CandidateDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-detail',
  templateUrl: 'candidate-detail.html',
})
export class CandidateDetailPage {
  detail1:any;
  detail2:any;
  reqId:string;
  cId:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,) {
    this.detail1=navParams.get('details'); 
    this.detail2=navParams.get('detailsById'); 
    this.reqId=navParams.get('reqId');  
    this.cId=navParams.get('cId');  
    console.log("detail1",this.reqId);
    console.log("this.detail2",this.cId);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidateDetailPage');
  }
  goBack(){
    this.viewCtrl.dismiss();
  }
}
