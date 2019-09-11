import { Component ,Input} from '@angular/core';
import { IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { InterviewModalPage }  from '../../pages/interview-modal/interview-modal';
import { CandidateDetailPage }  from '../../pages/candidate-detail/candidate-detail';
import { OquestionPage }  from '../../pages/oquestion/oquestion';
import { SelfRatingPage }  from '../../pages/self-rating/self-rating';
import { QuestionResponsePage }  from '../../pages/question-response/question-response';


/**
 * Generated class for the CandidateResponsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-response',
  templateUrl: 'candidate-response.html',
})
export class CandidateResponsePage {
  text: string;
  token:string;
  reqId:string;
  cId:string;
  response:any;
  responsebyid:any={};
  firstName:string;
  lastName:string;
  candidateDetails:any;
  finalVerdict:string;
  finalVerdictChange:string
  
  candidateGeneralQuestion:any;
  ratings:any;
  videos:any;
  qdetails:any;
  notes:any;
  
  loginUser:any;
  comment:string;
  average:any;
  workflowId:string;
  interview_details:any;
  positionCandidates:any;
  message:string;
  candidateLink:string;
  roundNo:number;
  constructor(public navCtrl: NavController,  public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public viewCtrl : ViewController,
    ) {
    this.token = this.util.getToken();
    this.reqId=navParams.get('reqId');  
    this.cId=navParams.get('cId'); 
    this.workflowId=navParams.get('workflowId'); 
    this.loginUser = this.util.getSessionUser(); 
    this.candidateResponse( );
    this.getsecondRound();
    this.mutlipleRoundsSelfRating();
    this.getTop3Req();
   // this.screenerFeedBackInterviewRound();
    this.responseBycandidateId( );
   
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidateResponsePage');
  }

  candidateResponse(){
    this.restProvider.candidateResponse(this.token,this.reqId,this.cId)
    .then((res:any)=>{
      this.response = res;
      console.log(this.response);
      this.finalVerdict =  this.response.positionCandidates.finalVerdict;
      this.finalVerdictChange = this.finalVerdict;
     
      this.candidateGeneralQuestion =this.response.candidateGeneralQuestionResponseList;
      this.ratings = this.response.candidateSelfRatingResponsesList;
    
      this.qdetails = this.response.candidateTechnicalQuestionResponseList;
      this.videos = this.response.candidateVideoQuestionResponseList;
      this.notes = this.response.candidateUserNotesList;
     
      this.average= this.response.finalAverage;
      this.positionCandidates = this.response.positionCandidates;
    
      console.log("positionCandidates",this.positionCandidates);
      if(this.positionCandidates[0].submissionType == 'Zoom' ){
        this.restProvider.screenerFeedBackInterviewRound(this.token,this.reqId,this.cId,1)
        .then((res:any)=>{
          this.interview_details= res;
         console.log("interview_details",this.interview_details);
  
        },errrr=>{
        });
      }
     
    },errrr=>{
    });  
  }
  onSelectChange(selectedValue) {

    console.log('Selected', selectedValue);
    this.roundNo = selectedValue;
   
   

    if(this.positionCandidates[selectedValue-1].submissionType == 'Zoom'){
    console.log('Selected2222', [selectedValue-1]);

      this.restProvider.screenerFeedBackInterviewRound(this.token,this.reqId,this.cId,this.roundNo)
      .then((res:any)=>{
        this.interview_details= res;
       console.log("interview_details",this.interview_details);

      },errrr=>{
      });

      if(this.roundNo == 2){
        this.candidateLink = this.positionCandidates[1].candidateLink.substring(18)
        this.restProvider.hotZoomVideo(this.token,this.candidateLink,this.cId,this.reqId)
        .then((res:any)=>{
          this.message= res;
         console.log("message",this.message);
  
        },errrr=>{
        });
      }
    }
 
  }
  responseBycandidateId(){
    this.restProvider.responseBycandidateId(this.token,this.cId)
    .then((res:any)=>{
      this.responsebyid = res;
      this.candidateDetails = this.responsebyid['Candidate Details']
      this.firstName =  this.candidateDetails.firstName;
      this.lastName = this.candidateDetails.lastName;
      
    },errrr=>{
    });
  }

  getsecondRound(){
    this.restProvider.responseBycandidateId(this.token,this.cId)
    .then((res:any)=>{
    },errrr=>{
    });
  }
  mutlipleRoundsSelfRating(){
    this.restProvider.mutlipleRoundsSelfRating(this.token,this.reqId,this.cId)
    .then((res:any)=>{
    },errrr=>{
    });
  }
  getTop3Req(){
    this.restProvider.getTop3Req(this.token,this.cId)
    .then((res:any)=>{
    },errrr=>{
    });
  }
  // screenerFeedBackInterviewRound(){
  //   this.restProvider.screenerFeedBackInterviewRound(this.token,this.reqId,this.cId,1)
  //   .then((res:any)=>{
  //     this.interview_details= res;
  //   },errrr=>{
  //   });
  // }
  openModal(question:any){
    let chooseModal = this.modalCtrl.create(InterviewModalPage,{questions:question,workflowId:this.workflowId});
  //  console.log("gggggggggggggggggggg",this.question);
    chooseModal.present(); 
  }

  gotoCanditateDetails(){
    this.navCtrl.push(CandidateDetailPage,
      {details:this.response,detailsById: this.candidateDetails,reqId: this.reqId,cId:this.cId,workflowId:this.workflowId});
    //console.log("adyasa",this.candidateDetails);
  }
  gotoQuestions(){
    this.navCtrl.push(OquestionPage,
      {gen_que: this.candidateGeneralQuestion,reqId: this.reqId,cId:this.cId,workflowId:this.workflowId});
    //console.log("adyasa",this.candidateDetails);
  }

  gotoRatings(){
    this.navCtrl.push(SelfRatingPage,
      {ratings: this.ratings,reqId: this.reqId,cId:this.cId,workflowId:this.workflowId});
    //console.log("adyasa",this.score);
  }

  gotoQuestionResponse(){
    this.navCtrl.push(QuestionResponsePage,
      {qdetails: this.qdetails,finalVerdict:this.finalVerdict,workflowId:this.workflowId,videos: this.videos,reqId: this.reqId,cId:this.cId,interview_details: this.interview_details,interview_questions:this.response,message:this.message});
      console.log(" this.message", this.message);
  }

  goBack(){
    this.navCtrl.pop();
  }

  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   if(this.finalVerdict != 'Pending' ){
    if(this.comment == undefined || this.comment == ""){
      this.util.showToast("please Give Feedback.","ERROR");
      return;
    }
    if(this.finalVerdictChange == undefined || this.finalVerdictChange == ''  ){
      this.util.showToast("please select feedback.","ERROR");
      return;
    }
    
  }
     
     
        let jsonData2 ={
          "average":this.average, 
          "candidateId": this.cId,
          "comment":this.comment,
          "finalVerdict":this.finalVerdictChange,
          "positionId":this.reqId,

        user :{
          contactNumber: this.loginUser.contactNumber,
          emailId: this.loginUser.emailId,
          enabled: true,
          errorMessage: null,
          firstName: this.loginUser.firstName,
          groupsSet: [],
          groupsSet_id: this.loginUser.id,
          id:this.loginUser.id,
          imageUrl: this.loginUser.imageUrl,
          lastName: this.loginUser.lastName,
          online: false,
          password: this.loginUser.password,
          role: this.loginUser.role,  
          userName: this.loginUser.userName
          },
          userJwtBean: {
            emailId: this.loginUser.emailId,
            firstName: this.loginUser.firstName,
            id: this.loginUser.id,
            lastName: this.loginUser.lastName,
            role: this.loginUser.role,
            userName: this.loginUser.userName
          },
          "workflowId":this.workflowId
        }
        
        //console.log("json",jsonData);
          loading.present().then(()=>{
            this.restProvider.updateResult(this.token,jsonData2)
            .then(data => {
              
              loading.dismiss();
              this.util.showToast("Successfully Submitted.","SUCCESS");
               console.log("data",data); 
               
            },error => {
                loading.dismiss();
                this.util.showToast("Something went wrong.","ERROR");
                console.log(error);
            });

            this.restProvider.email(this.token,jsonData2)
            .then(data => {           
              loading.dismiss();
              this.util.showToast("Successfully Email Submitted.","SUCCESS");
               console.log("data",data); 
            },error => {
                loading.dismiss();
                this.util.showToast("Something went wrong.","ERROR");
                console.log(error);
            });
          });   
           
  }
  
  
}
