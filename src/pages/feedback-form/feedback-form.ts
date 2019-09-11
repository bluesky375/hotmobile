import { Component } from '@angular/core';
import { App,IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController,AlertController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the FeedbackFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback-form',
  templateUrl: 'feedback-form.html',
})
export class FeedbackFormPage {
  token:string;
  cId:string;
  reqId:string;
  candidateLink:string;
  submissionType:string;
  loginUser:any;
  result:any;
  ZoomResponse:any;
  value:any;
  topic:string;
  start_time:string;
  start_url:string;
  candidateObject:any={};
  skills:string;
  skillType:string;
  candidateSkillsSet:any=[];
  skillArray:Array<Object> = [];
  firstName:string;
  lastName:string;
  emailId:string;
  cellPhoneNumber:string;
  currentLocation:string;
  score:string='';
  comment:string;
  finalVerdictChange:string;
  Js_score:string;
  Html_score:string;
  Scrum_score:string;
  NodeJs_score:string;
  Css_score:string;
  Angular_score:string;
  constructor(public navCtrl: NavController,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
    this.token = this.util.getToken();
    this.cId =navParams.get('cId');
    this.reqId =navParams.get('reqId');
    this.loginUser = this.util.getSessionUser(); 
    this.submissionType =navParams.get('submissionType');
    this.candidateLink =navParams.get('candidateLink').replace('https://interviews.skype.com/interviews?code=',"");
    console.log('start_url',this.candidateLink);
    
      this.getFeedbackForms();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackFormPage');
  }

  getFeedbackForms(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.responseBycandidateId(this.token,this.cId)
    .then((res:any) => {
      this.result = res['Candidate Details'];
      this.firstName = this.result.firstName;
      this.lastName = this.result.lastName;
      this.emailId = this.result.emailId;
      this.cellPhoneNumber = this.result.cellPhoneNumber;
      this.currentLocation = this.result.currentLocation;
      this.candidateSkillsSet = this.result.candidateSkillsSet[0];
      this.skillType = this.result.candidateSkillsSet[0].skillType;
      this.skills =  this.result.candidateSkillsSet[0].skills;
     

      loading.dismiss();
    },error => {
      loading.dismiss();
    });
    // this.restProvider.interviewResponse(this.token,this.candidateLink,this.reqId,this.cId)
    // .then((res:any) => {
    //   this.result = res;
    //   this.ZoomResponse =this.result.ZoomResponse
    //   this.value =JSON.parse(this.ZoomResponse);
    //   this.topic = this.value.topic;
    //   this.start_time = this.value.start_time;
    //   this.start_url = (this.value.start_url).substring(0,27);
    //   this.candidateObject = this.result.candidateObject;
    //   this.candidateSkillsSet = this.result.candidateObject.candidateSkillsSet[0];
    //   this.skills =  this.candidateSkillsSet.skills;
    //   this.skillType =  this.candidateSkillsSet.skillType;
    //   console.log(" this.primarySkill", this.skills);
    //   console.log(" this.secondarySkill", this.skillType);
    //   console.log(" this.candidateSkillsSet", this.candidateSkillsSet);

    //   let skillname ;
    //  skillname = (this.skillType);
     
    //   Object.keys(skillname).forEach(key=> {
    //     if(skillname[key] == 'PrimarySkill'){
    //       this.skills;
    //       alert("hhh")
    //     }else{
    //       this.skills;
    //       alert("......")
    //     }
       
    //   });

     
    //   console.log('this.value',this.value);
    //   loading.dismiss();
      
    // },error => {
    //   loading.dismiss();
    // });  
  }

  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   
    let ptypes = [];
    Object.keys(this.skillArray).forEach(key=> {
      if(this.skillArray[key].skill == "javascript"){
        ptypes.push(this.Js_score);

      }
      if(this.skillArray[key].skill == "html"){
        ptypes.push(this.Html_score);

      }
      if(this.skillArray[key].skill == "scrum master"){
        ptypes.push(this.Scrum_score);

      }
      if(this.skillArray[key].skill == "node js"){
        ptypes.push(this.NodeJs_score);

      }
      if(this.skillArray[key].skill == "css"){
        ptypes.push(this.Css_score);

      }
      if(this.skillArray[key].skill == "angular js"){
        ptypes.push(this.Angular_score);

      }
      this.skillArray.push({
        'candidateId':this.cId,
        'positionId':this.reqId,
        'score':this.score,
        
      });
  });
      let jsonData = {
          "cId": this.cId,
          candidateSelfRatingResponseList:[{
            'candidateId':this.cId,
            'positionId' :this.reqId,
          }]
          ,
          "feedBack": this.comment,
          "notes":"",
          "other":"",
          "reqId":this.reqId,
          "score":this.score,
          "screenerId":this.loginUser.id,
          "status":this.finalVerdictChange,
          "userName":this.loginUser.userName

        }
       
        console.log("json",jsonData);
        loading.present();   
          this.restProvider.screenerFeedBack(this.token,jsonData)
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
          
         
  }
  goBack(){
    this.viewCtrl.dismiss();
  }
}
