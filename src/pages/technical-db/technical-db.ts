import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ViewController,PopoverController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { TechnicalQuestionPage }  from '../../pages/technical-question/technical-question';

/**
 * Generated class for the TechnicalDbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technical-db',
  templateUrl: 'technical-db.html',
})
export class TechnicalDbPage {
  reqId:string;
  workflowId:string;
  actMgrId:string;
  loginUser:any={};
  token:string;
  technicals:any;
  selecteddetails=[];
  jobTitle:string;
  interviewType:string;
  buttonDisabled:boolean=true;
  outcomes:any;
  i=1;
  currentReqActions:any={};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public popoverCtrl: PopoverController,
    public modalCtrl:ModalController,
    ) {
      this.reqId = navParams.get('reqId');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.workflowId =navParams.get('workflowId');
      this.currentReqActions =navParams.get('currentReqActions');
      this.technicalQuestionFromDb();
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCandidateDbPage');
  }
 
  technicalQuestionFromDb(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.technicalQuestionsDb(this.token,this.reqId)
  
    .then( res=> {
      this.technicals = res;
      console.log('this.Clients',this.technicals);
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });

    
  }
 
  radioClicked(details){
      
     if(this.selecteddetails.length == 0){
      this.selecteddetails.push(details);
     }

     else{
      let temp = this.selecteddetails.find(o => o.id === details.id);
      console.log("selected item " , temp);
      if(temp === undefined){
        this.selecteddetails.push(details);
      }

      else{
        this.selecteddetails = this.selecteddetails.filter(function( obj ) {
          return obj.id !== details.id;
        });
       }
     }

  
   
   // let updateItem = this.selecteddetails.find(this.findIndexToUpdate, details.candidateId);
    if(this.selecteddetails.length>0){
      this.buttonDisabled = false;
    }
    else{
      this.buttonDisabled = true;
    }
  }

  goBack(){
    this.viewCtrl.dismiss();
 }
 
 addRequirement(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
    loading.present();
    let jsonContact = {
      "role":this.loginUser.role,
      "userId":this.loginUser.id,
      "workflowId":this.workflowId
    }
   
    this.restProvider.allowedActions(jsonContact,this.token)
    .then(res => {
      this.currentReqActions = res;
    },error => {
     
    });

      Object.keys(this.selecteddetails).forEach(key=> {
      let jsonData={
        positionId:this.reqId,
        questionIds:[this.selecteddetails[key].id],
        questionType:"Technical",
        seqId:[this.selecteddetails[key].i],
        "user":this.loginUser,
      }
      jsonData.user.groupsSet=[];
      jsonData.user.technicalScreenerDetailsSkillsSet=[];
      this.restProvider.addTecQuestionFromDB(this.token,jsonData)
      .then( res=> {
         this.outcomes = res;
        console.log('this.outcomes',this.outcomes);
        loading.dismiss();
      this.navCtrl.push(TechnicalQuestionPage,{reqId:this.reqId,currentReqActions:this.currentReqActions});
     
      },error => {
        loading.dismiss();
      });
  });

 
 }

}

