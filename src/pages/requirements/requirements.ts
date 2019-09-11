import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { RequirementPopoverComponent } from '../../components/requirement-popover/requirement-popover';
import { AddrequirementPage }  from '../../pages/addrequirement/addrequirement';
import { EditrequirementsPage }  from '../../pages/editrequirements/editrequirements';
import { HomePage } from '../home/home';
import { CandidatePage }  from '../../pages/candidate/candidate';
//import { Calendar } from '@ionic-native/calendar/ngx';

/**
 * Generated class for the RequirementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requirements',
  templateUrl: 'requirements.html',
})
export class RequirementsPage {
token:string;
requirements:any;
loginUser:any = {};
currentReqActions:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ,
    ) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();

      this.getRequirement(this.loginUser);
     // this.allowedAction(this.requirements);

      
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RequirementsPage');
  }

  getRequirement(user){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getRequirements(this.token,user)
    .then( res=> {
      this.requirements = res;
    console.log( "requirements",this.requirements);

      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  
 
  presentPopover(myEvent,requirement){
    let popover = this.popoverCtrl.create(RequirementPopoverComponent,requirement);
    popover.present({
     ev: myEvent  
     
    });
    console.log( "popover",popover);
  

  }
 
  allowedActions(){

  }
  
  candidateView(client){
   
    let jsonContact = {
        "role":this.loginUser.role,
        "userId":this.loginUser.id,
        "workflowId":client.workflowId
      }
    this.restProvider.allowedActions(jsonContact,this.token)
    .then(res => {
      this.currentReqActions = res;
  
  this.navCtrl.push(CandidatePage,{reqId:client.positionId, workflowId:client.workflowId,actMgrId:  client.actMgrId,jobTitle:client.jobTitle, interviewType:client.interviewArray,currentReqActions:this.currentReqActions });

    },error =>{

    });
   
  }
  createRequirement(){
    this.navCtrl.push(AddrequirementPage)
   // console.log("id",clientId);
  }
  goBack(){
    this.navCtrl.push(HomePage)
  }

  
}
