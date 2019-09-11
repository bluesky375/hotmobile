import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController,AlertController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { GeneralQuestionsPage }  from '../../pages/general-questions/general-questions';
import { RequirementsPage } from '../../pages/requirements/requirements';
import { AddTechnicalPage }  from '../../pages/add-technical/add-technical';
import { TechnicalDbPage }  from '../../pages/technical-db/technical-db';

/**
 * Generated class for the TechnicalQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technical-question',
  templateUrl: 'technical-question.html',
})
export class TechnicalQuestionPage {
  reqId:string;
  token:string;
  technicals:string;
  lastMileStone:string;
  currentReqActions:any={};
 
  workflowId:string;
  loginUser:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,
    public alertCtrl:AlertController) {
    this.token = this.util.getToken();
    this.reqId = navParams.get('reqId');
    this.lastMileStone = navParams.get('lastMileStone');
    this.currentReqActions =navParams.get('currentReqActions');
   
    this.workflowId=navParams.get('workflowId');
    this.loginUser = this.util.getSessionUser();
    console.log(' this.workflowId', this.workflowId);
  
    console.log(' this.currentReqActions', this.currentReqActions);
   
    this.techquestionById();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicalQuestionPage');
  }
 techquestionById(){
  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.technicalQuestions(this.token,this.reqId)
    .then((data:any) => {
        this.technicals = data.positionTechnicalQuestionList;
        loading.dismiss();
      console.log("hhhhhasdsdhh",this.technicals);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
        loading.dismiss();
       // console.log(error);
    });
    
  }
  gotoGeneral(){
    
    this.navCtrl.push(GeneralQuestionsPage,{reqId:this.reqId,lastMileStone:this.lastMileStone,currentReqActions:this.currentReqActions});
  }
  goBack(){
    //this.navCtrl.pop();
    this.navCtrl.push(RequirementsPage);

 }
 addQuestionDb(){
  
  this.navCtrl.push(TechnicalDbPage,{reqId:this.reqId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});

 }
 createNew(){
  this.navCtrl.push(AddTechnicalPage,{reqId:this.reqId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});

 }
 submitQuestions(){
  let confirm = this.alertCtrl.create({
    title: 'Submit Question',
    message: 'Are you sure you want to submit the questions for this requirement?',
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
         
          'requirementId': this.reqId,
          'user': this.loginUser,
         
          }
         jsonData.user.groupsSet =[];
         jsonData.user.technicalScreenerDetailsSkillsSet =[];


          loading.present();
          this.restProvider.submitQuestions(this.token,this.reqId,jsonData)
          .then(data => {
          
            loading.dismiss();
            let jsonData2= {
         
              'emailId': this.loginUser.emailId,
              'firstName': this.loginUser.firstName,
              'id': this.loginUser.id,
              'lastName': this.loginUser.lastName,
              'questionId': 0,
              'questionType': "string",
              'requirementId': this.reqId,
              'role': this.loginUser.role,
              'userName': this.loginUser.userName
             
              }
            this.restProvider.submitQuestionsMail(this.reqId,jsonData2,this.token)
            .then(data => {
            },error => {
              loading.dismiss(); 
              
            })
              
              let jsonContact = {
                "role":this.loginUser.role,
                "userId":this.loginUser.id,
                "workflowId":this.workflowId
              }
             
              this.restProvider.allowedActions(jsonContact,this.token)
              .then(res => {
               
              },error => {
                this.restProvider.editCandidate(this.token,this.reqId)
                .then(res => {

                },error => {
                 
                })
                this.restProvider.detailsForDropdown(this.token)
                .then(res => {
                  this.navCtrl.push(GeneralQuestionsPage,{reqId:this.reqId,currentReqActions:this.currentReqActions});
                },error => {
                 
                })
               
              })
            },error => {
              loading.dismiss();
             
            })
   
         
       
         
        }
      }
    ]
  });
  confirm.present();
 }
 approveQuestion(){
  let confirm = this.alertCtrl.create({
    title: 'Approve Question',
    message: 'Are you sure you want to Approve Question ?',
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
         
          'approveStatus': 'Yes',
          'requirementId:':  this.reqId,
          'user':this.loginUser,
          userJwtBean:{
            'emailId':this.loginUser.emailId,
            'firstName':this.loginUser.firstName,
            'id':this.loginUser.id,
            'lastName':this.loginUser.lastName,
            'role':this.loginUser.role,
            'userName':this.loginUser.userName
          }
          }
          jsonData.user.groupsSet = [];
          jsonData.user.technicalScreenerDetailsSkillsSet = [];

          loading.present();
          this.restProvider.reviewQuestions(this.token,jsonData)
          .then(data => {
            this.restProvider.reviewQuestionsMail(this.token,jsonData)
            .then(data => {
            
            },error => {
             
            })
            loading.dismiss();
            this.util.showToast("Added sucessfuly","SUCCESS");
           
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          })
          
          this.restProvider.editRequirements(this.reqId, this.token)
          .then(data => {
            this.restProvider.detailsForDropdown(this.token)
              .then(data => {
                this.navCtrl.push(TechnicalQuestionPage,{reqId:this.reqId,currentReqActions:this.currentReqActions})
              },error => {

              });
            },error => {
        
          });
        }
      }
    ]
  });
  confirm.present();
}
rejectQuestion(){
  let confirm = this.alertCtrl.create({
    title: 'Approve Question',
    message: 'Are you sure you want to Approve Question ?',
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
         
          'approveStatus': 'Yes',
          'requirementId:':  this.reqId,
          'user':this.loginUser,
          userJwtBean:{
            'emailId':this.loginUser.emailId,
            'firstName':this.loginUser.firstName,
            'id':this.loginUser.id,
            'lastName':this.loginUser.lastName,
            'role':this.loginUser.role,
            'userName':this.loginUser.userName
          }
          }
          jsonData.user.groupsSet = [];
          jsonData.user.technicalScreenerDetailsSkillsSet = [];

          loading.present();
          this.restProvider.reviewQuestions(this.token,jsonData)
          .then(data => {
            this.restProvider.reviewQuestionsMail(this.token,jsonData)
            .then(data => {
            
            },error => {
             
            })
            loading.dismiss();
            this.util.showToast("Added sucessfuly","SUCCESS");
           
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          })
          
          this.restProvider.editRequirements(this.reqId, this.token)
          .then(data => {
            this.restProvider.detailsForDropdown(this.token)
              .then(data => {
                this.navCtrl.push(TechnicalQuestionPage,{reqId:this.reqId,currentReqActions:this.currentReqActions})
              },error => {

              });
            },error => {
        
          });
        }
      }
    ]
  });
  confirm.present();
}
}
