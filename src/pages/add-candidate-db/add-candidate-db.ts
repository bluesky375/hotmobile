import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ViewController,PopoverController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { CandidateSidePopoverComponent }  from '../../components/candidate-side-popover/candidate-side-popover';
import { EditCandidateDbPage }  from '../../pages/edit-candidate-db/edit-candidate-db';
import { SelectCandidateDbModalPage }  from '../../pages/select-candidate-db-modal/select-candidate-db-modal';
import { RequirementsPage } from '../../pages/requirements/requirements';

/**
 * Generated class for the AddCandidateDbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-candidate-db',
  templateUrl: 'add-candidate-db.html',
})
export class AddCandidateDbPage {
  reqId:string;
  workflowId:string;
  actMgrId:string;
  loginUser:any={};
  token:string;
  candidates:any;
  selecteddetails=[];
  jobTitle:string;
  interviewType:string;
  buttonDisabled:boolean=true;
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
      this.workflowId = navParams.get('workflowId');
      this.actMgrId = navParams.get('actMgrId');
      this.jobTitle = navParams.get('jobTitle');
      this.interviewType = navParams.get('interviewType');
      this.currentReqActions =navParams.get('currentReqActions');

      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.getCandidatesFromDb();
      console.log("interviewType",this.interviewType)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCandidateDbPage');
  }
 
  getCandidatesFromDb(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.candidatesfromdb(this.token,this.reqId)
    .then( res=> {
      this.candidates = res;
      console.log('this.Clients',this.candidates);
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
      let temp = this.selecteddetails.find(o => o.candidateId === details.candidateId);
      console.log("selected item " , temp);
      if(temp === undefined){
        this.selecteddetails.push(details);
      }

      else{
        this.selecteddetails = this.selecteddetails.filter(function( obj ) {
          return obj.candidateId !== details.candidateId;
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
    this.viewCtrl.dismiss(RequirementsPage);
    //this.navCtrl.pop(RequirementsPage);
 }
 presentPopover(myEvent,details){
  let popover = this.popoverCtrl.create(CandidateSidePopoverComponent,details);
 
  popover.present({
   
   ev: myEvent,
 
   
  });
 console.log("candidates",details);
}

gotoEditdetails(details){
  this.navCtrl.push(EditCandidateDbPage,{canId:details.candidateId});

  console.log("helllo",details.candidateId);
}

addCandidate(){
  
  
  let chooseModal = this.modalCtrl.create(SelectCandidateDbModalPage,{reqId:this.reqId,selecteddetails:this.selecteddetails,interviewType:this.interviewType,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
   console.log("gggggggggggggggggggginterviewType",this.reqId,this.interviewType);
    chooseModal.present(); 
}

}
