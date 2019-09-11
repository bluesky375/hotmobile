import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController,AlertController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { TechnicalQuestionPage }  from '../../pages/technical-question/technical-question';
import { RequirementsPage } from '../../pages/requirements/requirements';
import { GeneralDbPage }  from '../../pages/general-db/general-db';
import { AddGeneralPage }  from '../../pages/add-general/add-general';
/**
 * Generated class for the GeneralQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-questions',
  templateUrl: 'general-questions.html',
})
export class GeneralQuestionsPage {
  reqId:string;
  lastMileStone:string;
  token:string;
  generals:Array<Object> = [];
  allowAction:any;
  currentReqActions:any={};
  workflowId:string;
  loginUser:any;  
  submit:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public alertCtrl: AlertController,
    public util: UtilsProvider,) {
    this.token = this.util.getToken();
    this.reqId = navParams.get('reqId');
    this.lastMileStone = navParams.get('lastMileStone');
    this.workflowId=navParams.get('workflowId');
    this.currentReqActions =navParams.get('currentReqActions');
    this.loginUser = this.util.getSessionUser();
   
    this.submit= navParams.get('submit');
    console.log(' this.currentReqActions', this.currentReqActions);
   
    console.log(' this.workflowId', this.workflowId);
   
   

    this.genquestionById();
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralQuestionsPage');
  }

  goBack(){
    //this.navCtrl.pop();
    this.navCtrl.push(RequirementsPage);

 }
  genquestionById(){
  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.generalQuestions(this.token,this.reqId)
    .then((data:any) => {
        this.generals = data.positionGeneralQuestionList;
        loading.dismiss();
      console.log("hhhhhasdsdhh",this.generals);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
        loading.dismiss();
       // console.log(error);
    });
    
  }
  gotoTechnicals(){
    this.navCtrl.push(TechnicalQuestionPage,{reqId:this.reqId,lastMileStone:this.lastMileStone,currentReqActions:this.currentReqActions,workflowId:this.workflowId});
  console.log("adyasa",this.reqId);
  console.log("lastMileStone",this.lastMileStone);
  }
  addQuestionDb(){
    this.navCtrl.push(GeneralDbPage,{reqId:this.reqId,lastMileStone:this.lastMileStone,currentReqActions:this.currentReqActions,workflowId:this.workflowId});
  }
  createNew(){
  this.navCtrl.push(AddGeneralPage,{reqId:this.reqId,lastMileStone:this.lastMileStone,currentReqActions:this.currentReqActions,workflowId:this.workflowId});

  }
  submitQuestions(){
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
