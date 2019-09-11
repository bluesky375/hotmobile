import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';
import { InterviewModalPage }  from '../../pages/interview-modal/interview-modal';
/**
 * Generated class for the QuestionResponsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question-response',
  templateUrl: 'question-response.html',
})
export class QuestionResponsePage {
  reqId:string;
  cId:string;
  detail1:any;
  video_questions:any;
  finalVerdict:string;
  workflowId:any;
  total_question:Array<Object> = [];
  interview_details:any;
  PositionCandidates:any;
  videoLink:string;
 
  message:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,
    public modalCtrl:ModalController) {
      this.reqId=navParams.get('reqId');  
      this.cId=navParams.get('cId'); 
      this.detail1=navParams.get('qdetails');
      this.video_questions=navParams.get('videos');
      this.finalVerdict=navParams.get('finalVerdict');
      this.workflowId=navParams.get('workflowId');
      this.interview_details=navParams.get('interview_details');
      this.message =navParams.get('message');
      
      if(this.interview_details != null || this.interview_details != undefined){
        this.PositionCandidates = this.interview_details.PositionCandidates
        this.videoLink = this.PositionCandidates.videoLink
      }
   
  
      if(this.total_question != null || this.total_question != undefined){
        this.total_question = this.detail1;
        Object.keys(this.video_questions).forEach(key=> {
          this.total_question.push(this.video_questions[key])
        });
        // console.log("kelooooo" , this.total_question);
      }
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionResponsePage');
  }
  goBack(){
    this.viewCtrl.dismiss();
  }

  openModal(question:any){
    let chooseModal = this.modalCtrl.create(InterviewModalPage,{questions:question,finalVerdict:this.finalVerdict,workflowId:this.workflowId,cId:this.cId,reqId:this.reqId});
  //  console.log("gggggggggggggggggggg",this.question);
    chooseModal.present(); 
  }
}
