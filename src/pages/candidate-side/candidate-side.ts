import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { CandidateSidePopoverComponent }  from '../../components/candidate-side-popover/candidate-side-popover';
import { EditCandidateSidePage }  from '../../pages/edit-candidate-side/edit-candidate-side';
import { CreateCandidateSidePage }  from '../../pages/create-candidate-side/create-candidate-side';
import { HomePage } from '../home/home';

/**
 * Generated class for the CandidateSidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-side',
  templateUrl: 'candidate-side.html',
})
export class CandidateSidePage {
  loginUser:any={};
  token:string;
  candidates:any;
  code:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.getCandidates();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ClientsPage');
  }

  getCandidates(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getCandidates(this.token)
    .then( res=> {
      this.candidates = res;
      console.log('this.Clients',this.candidates);
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }

  presentPopover(myEvent,candidates){
    let popover = this.popoverCtrl.create(CandidateSidePopoverComponent,candidates);
   
    popover.present({
     
     ev: myEvent,
   
     
    });
   console.log("candidates",candidates);
  }


  gotoEditdetails(candidates){
    this.navCtrl.push(EditCandidateSidePage,{canId:candidates.candidateId});

    console.log("helllo",candidates.candidateId);
  }

  createCandidate(){
    this.navCtrl.push(CreateCandidateSidePage);
  }

  goBack(){
    this.navCtrl.push(HomePage)
  }
}
