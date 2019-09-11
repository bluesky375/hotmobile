import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the InterviewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-interview-modal',
  templateUrl: 'interview-modal.html',
})
export class InterviewModalPage {
  interview_details:any;
  video_details:any;
  loginUser:any;
  reqId:string;
  cId:string;
  finalVerdict:string;
  score:string='';
  workflowId:any;
  token:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public viewCtrl : ViewController,
    public restProvider: RestProvider,) {
    this.token = this.util.getToken();
    this.loginUser = this.util.getSessionUser(); 
    this.reqId=navParams.get('reqId');  
    this.cId=navParams.get('cId'); 
    this.interview_details=navParams.get('questions'); 
    this.finalVerdict=navParams.get('finalVerdict'); 
    this.workflowId=navParams.get('workflowId'); 

   
    console.log("gtttttttttttt",this.finalVerdict);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterviewModalPage');
  }
  cancelData(){
    this.viewCtrl.dismiss();
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  updateResult(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

      let jsonData = {
          "candidateId": this.cId,
          "finalVerdict": this.finalVerdict,
          "positionId":this.reqId,
          "questionId":this.interview_details.questionId,
          "score":this.interview_details.score,
          "user":this.loginUser,
          "workflowId":this.workflowId
        }
        jsonData.user.groupsSet=[];
        jsonData.user.technicalScreenerDetailsSkillsSet=[];

        console.log("json",jsonData);
        loading.present();   
          this.restProvider.technicalupdateScore(this.token,jsonData)
            .then(data => {
             
              loading.dismiss();
              this.util.showToast("Successfully Submitted.","SUCCESS");
              // console.log("data",data); 
               //this.viewCtrl.dismiss('SUCCESS');
            },error => {
                loading.dismiss();
                this.util.showToast("Something went wrong.","ERROR");
                console.log(error);
            });
          
            this.restProvider.updateScoreById(this.token,this.reqId,this.cId)
            .then(data => {
             
              loading.dismiss();
              this.util.showToast("Successfully Submitted.","SUCCESS");
              // console.log("datmmmmmmmmmmma",data); 
            },error => {
                loading.dismiss();
                this.util.showToast("Something went wrong.","ERROR");
                console.log(error);
            });

  }
}
