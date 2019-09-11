import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ViewController,PopoverController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { GeneralQuestionsPage }  from '../../pages/general-questions/general-questions';

/**
 * Generated class for the GeneralDbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-db',
  templateUrl: 'general-db.html',
})
export class GeneralDbPage {
  reqId:string;
  workflowId:string;
  actMgrId:string;
  loginUser:any={};
  token:string;
  general:any;
  selecteddetails=[];
  jobTitle:string;
  interviewType:string;
  buttonDisabled:boolean=true;
  outcomes:any;
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
     
      this.currentReqActions =navParams.get('currentReqActions');
      this.technicalQuestionFromDb();
      console.log("interviewType",this.interviewType)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCandidateDbPage');
  }
 
  technicalQuestionFromDb(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.generalQuestionsDb(this.token,this.reqId)
  
    .then( res=> {
      this.general = res;
      console.log('this.Clients',this.general);
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
      Object.keys(this.selecteddetails).forEach(key=> {
      let jsonData={
        positionId:this.reqId,
        questionIds:[this.selecteddetails[key].id],
        questionType:"General",
        seqId:[this.selecteddetails[key].id],
        "user":this.loginUser,
      }
      jsonData.user.groupsSet=[];
      jsonData.user.generalcreenerDetailsSkillsSet=[];
      this.restProvider.addTecQuestionFromDB(this.token,jsonData)
      .then( res=> {
         this.outcomes = res;
        console.log('this.outcomes',this.outcomes);
        loading.dismiss();
        this.navCtrl.push(GeneralQuestionsPage,{reqId:this.reqId,currentReqActions:this.currentReqActions});
      },error => {
        loading.dismiss();
      });
  });
 }

}


