import { Component } from '@angular/core';
import {App, IonicPage,ViewController,AlertController, NavController, NavParams,LoadingController,PopoverController,ModalController} from 'ionic-angular';
import { CandidatePage }  from '../../pages/candidate/candidate';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { GeneralQuestionsPage }  from '../../pages/general-questions/general-questions';
import { AddResourcePage }  from '../../pages/add-resource/add-resource';
import { CloseReqPopoverComponent }  from '../../components/close-req-popover/close-req-popover';
import { EditrequirementsPage }  from '../../pages/editrequirements/editrequirements';

@Component({
  selector: 'requirement-popover',
  templateUrl: 'requirement-popover.html'
})
export class RequirementPopoverComponent {
  requirementId:string;
  workflowId:string;
  actMgrId:string;
  loginUser:any;
  token:string;
  jobTitle:string;
  ccRequirement:any;
  addNoMoreCandidates:string;
  lastMileStone:string;
  details:any;
  interviewType:string;
  interviewArray:Array<Object> = [];
  clientName:string;
  currentReqActions:any=[];
  constructor(  public navCtrl: NavController, 
                public navParams: NavParams,
                public util: UtilsProvider,
                public popoverCtrl: PopoverController,
                public loadingCtrl: LoadingController,
                public restProvider: RestProvider,
                public appCtrl: App,
                public viewCtrl : ViewController,
                public alertCtrl: AlertController) {
                this.requirementId=navParams.get('positionId');
                this.workflowId = navParams.get('workflowId');
                this.actMgrId = navParams.get('actMgrId');
                this.jobTitle = navParams.get('jobTitle');
                this.addNoMoreCandidates = navParams.get('addNoMoreCandidates');
                this.lastMileStone = navParams.get('lastMileStone');
                this.clientName =navParams.get('clientName');
                this.token = this.util.getToken();
                this.loginUser = this.util.getSessionUser();
                this.allowedAction();
                console.log("hhhhhh", this.lastMileStone);
                console.log("requirementId", this.requirementId);
                console.log("addNoMoreCandidates", this.addNoMoreCandidates);
                this.editCandidate();
  }
 

candidateReq(){
  this.viewCtrl.dismiss();
  this.appCtrl.getRootNav().push(CandidatePage,{reqId:this.requirementId, workflowId:this.workflowId,actMgrId:  this.actMgrId,jobTitle:this.jobTitle, interviewType:this.interviewArray,currentReqActions:this.currentReqActions });
//  console.log("bjjjjjj",this.requirementId)
console.log("interviewTypekk",this.interviewType)

}
allowedAction(){
  let jsonContact = {
    "role":this.loginUser.role,
    "userId":this.loginUser.id,
    "workflowId":this.workflowId
  }
 
  this.restProvider.allowedActions(jsonContact,this.token)
  .then(res => {
    this.currentReqActions = res;
  },error => {
   
  })
}
questionAdd(){
  this.viewCtrl.dismiss();
  this.appCtrl.getRootNav().push(GeneralQuestionsPage,{reqId:this.requirementId,lastMileStone:this.lastMileStone,currentReqActions:this.currentReqActions,workflowId:this.workflowId});
    console.log('this.currentReqActions',this.currentReqActions);

}
addResources(){
  this.viewCtrl.dismiss();
  this.appCtrl.getRootNav().push(AddResourcePage,{reqId:this.requirementId,workflowId: this.workflowId,jobTitle:this.jobTitle,actMgrId:this.actMgrId});


}
editCandidate(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  this.restProvider.editCandidate(this.token,this.requirementId)
  .then( res=> {
    this.details = res;
    this.interviewType = this.details.interviewType;

    let interviewTypeName =[];
    if(this.interviewType != null){
      interviewTypeName = (this.interviewType.split(','));

      Object.keys(interviewTypeName).forEach(key=> {
       
          this.interviewArray.push({
                'type':interviewTypeName[key]
          });
       
       
      });
      console.log('this.Clients',this.interviewArray);
    }
    loading.dismiss();
   
  },error => {
    loading.dismiss();
  });

  
}


viewLogs(){
  this.viewCtrl.dismiss();
}

ccReq(){
  this.viewCtrl.dismiss();
  let confirm = this.alertCtrl.create({
    title: 'CC Requirement',
    message: 'Are you sure you want to create copy of this requitrement?',
    buttons: [
      {
        text: 'No',
        handler: () => {
          console.log('No clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          
          let jsonData = {
         
          'requirementId': this.requirementId,
          'user': this.loginUser,
         
          }
         jsonData.user.groupsSet =[];
         jsonData.user.technicalScreenerDetailsSkillsSet =[];


          loading.present();
          this.restProvider.ccRequirement(jsonData,this.token)
          .then(data => {
            this.ccRequirement = data;
            loading.dismiss();
            this.util.showToast("Vp Of Sales Deleted sucessfuly","SUCCESS");
           
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          })
        }
      }
    ]
  });
  confirm.present();
}

closeReq(){
      
   this.viewCtrl.dismiss();
  this.appCtrl.getRootNav().push(CloseReqPopoverComponent,
    {reqId:this.requirementId,workflowId: this.workflowId,jobTitle:this.jobTitle,actMgrId:this.actMgrId});
    
}
addNoCandidates(){
  let confirm = this.alertCtrl.create({
    title: 'Add no more candidates',
    message: 'Are you sure you want to stop adding candidates?',
    buttons: [
      {
        text: 'No',
        handler: () => {
          console.log('No clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          
          let jsonData = {
         
          'requirementId': this.requirementId,
          'user': this.loginUser,
         
          }
         jsonData.user.groupsSet =[];
         jsonData.user.technicalScreenerDetailsSkillsSet =[];


          loading.present();
          this.restProvider.addNoMoreCandidate(this.token,jsonData)
          .then(data => {
            this.ccRequirement = data;
            loading.dismiss();
            this.util.showToast("Added sucessfuly","SUCCESS");
           
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          })

          this.restProvider.addNoMoreCandidateMail(this.token,jsonData)
          .then(data => {
            this.ccRequirement = data;
            loading.dismiss();
            this.util.showToast("Added sucessfuly","SUCCESS");
           
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          })
        }
      }
    ]
  });
  confirm.present();
}

allowCandidates(){
  let confirm = this.alertCtrl.create({
    title: 'Add no more candidates',
    message: 'Are you sure you want to stop adding candidates?',
    buttons: [
      {
        text: 'No',
        handler: () => {
          console.log('No clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          
          let jsonData = {
         
          'requirementId': this.requirementId,
          'user': this.loginUser,
         
          }
         jsonData.user.groupsSet =[];
         jsonData.user.technicalScreenerDetailsSkillsSet =[];


          loading.present();
          this.restProvider.addNoMoreCandidate(this.token,jsonData)
          .then(data => {
           // this.ccRequirement = data;
            loading.dismiss();
            this.util.showToast("Added sucessfuly","SUCCESS");
           
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          })

          this.restProvider.addNoMoreCandidateMail(this.token,jsonData)
          .then(data => {
          //  this.ccRequirement = data;
            loading.dismiss();
            this.util.showToast("Added sucessfuly","SUCCESS");
           
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          })
        }
      }
    ]
  });
  confirm.present();
}
gotoEditRequirement(){
  this.viewCtrl.dismiss();
  this.navCtrl.push(EditrequirementsPage,{clientId:this.requirementId,clientName:this.clientName})
 console.log("hello");
}

}
