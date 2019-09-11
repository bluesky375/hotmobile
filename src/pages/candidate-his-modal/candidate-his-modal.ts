import { Component } from '@angular/core';
import {IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { CandidateHistoryDetailsPage }  from '../../pages/candidate-history-details/candidate-history-details';
import { EditrequirementsPage }  from '../../pages/editrequirements/editrequirements';



/**
 * Generated class for the CandidateHisModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-his-modal',
  templateUrl: 'candidate-his-modal.html',
})
export class CandidateHisModalPage {
  token:string;
  result:any;
  canId:string;
  positionId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ,
    public alertCtrl: AlertController,
    public viewCtrl : ViewController,
    public modalCtrl:ModalController) {
      this.token = this.util.getToken();
      this.canId = navParams.get('canId');
     this.candidateHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidateHisModalPage');
  }

  candidateHistory(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.historyCandidate(this.token,this.canId)
    .then( res=> {
      this.result = res;
      
      console.log("this.accMgr",this.result)
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }

 
  goBack(){
    this.viewCtrl.dismiss();
  }

  gotoEditdetails(ReqIds){
    this.navCtrl.push(CandidateHistoryDetailsPage,{ReqId: ReqIds.positionId });

    console.log('ReqId',ReqIds.positionId);
  }

}
