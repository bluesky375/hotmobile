import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ScreenerDetailModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-screener-detail-modal',
  templateUrl: 'screener-detail-modal.html',
})
export class ScreenerDetailModalPage {
 
  userid:string;
  token:string;
  id:string;
  userDetails:any={};
  contact:string;
  videoShow:boolean;
  skillShow:boolean;
  technicalScreenerDetailsDSkillsSet:any;
  showVideoDiv:boolean;
  showSkillDiv:boolean;
  showHistoryDiv:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public viewCtrl : ViewController) {
      this.userid = navParams.get('userid');
      this.contact = navParams.get('contact');
      this.token = this.util.getToken();
      this.editUsers();
      this.showVideoDiv=false;
      this.showSkillDiv = true;
      this.showHistoryDiv = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreenerDetailModalPage');
  }

  editUsers(){
    this.restProvider.editUsers(this.userid,this.token)
   .then((data:any)=>{
      this.userDetails =data;
      this.technicalScreenerDetailsDSkillsSet = this.userDetails.technicalScreenerDetailsDSkillsSet;
   console.log("technicalScreenerDetailsDSkillsSet",this.technicalScreenerDetailsDSkillsSet);
   },errrr=>{
     //console.log(errrr);
   });
 }
 closeModal(){
   this.viewCtrl.dismiss();
 }
 cancelData(){
   this.viewCtrl.dismiss();
 }

 showVideo(){
  this.showVideoDiv = true; 
  this.showSkillDiv = false;
  this.showHistoryDiv = false;
 }

 showSkill(){
  this.showSkillDiv = true;
  this.showVideoDiv = false; 
  this.showHistoryDiv = false;

 }

 showHistory(){
  this.showSkillDiv = false;
  this.showVideoDiv = false; 
  this.showHistoryDiv = true;
 }

}
