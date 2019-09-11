import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { DisplayQuestionsPage }  from '../../pages/display-questions/display-questions';
import { RequirementsPage } from '../../pages/requirements/requirements';
import { TechnicalQuestionPage }  from '../../pages/technical-question/technical-question';

/**
 * Generated class for the AddTechnicalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-technical',
  templateUrl: 'add-technical.html',
})
export class AddTechnicalPage {
  token:string;
  domain:any;
  loginUser:any;

  answer:string;
  selectDomain:string;
  level:string;
  option1:string;
  option2:string;
  option3:string;
  option4:string;
  option5:string;
  option6:string;

  questionName:string;
  type:string;
  myModel: any;
  finalAnswer:string;
  selectedType:any;
  generalModule: boolean ;
  technicalModule:boolean ;
  viewtechnicalButton:boolean ;
  reqId :string;
  currentReqActions:any={};
  seqId:number=1;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.generalModule=navParams.get('generalModule');  
      this.viewtechnicalButton=navParams.get('viewtechnicalButton');  
      this.currentReqActions=navParams.get('currentReqActions');  
      this.reqId=navParams.get('reqId');  
     // console.log('generalModule',this.generalModule);

      this.myModel=[];
      this.domainNames();
  }

  ionViewDidLoad() {
   
  }
  onSelectChange(selectedValue) {
    this.selectedType = selectedValue;
   console.log('Selected', this.selectedType);
    //console.log('selectedValue', selectedValue);
  
  }

  domainNames(){
    this.restProvider.domain(this.token)
    .then((res:any)=>{
      this.domain = res;
    // console.log("clientid",this.domain);
    },errrr=>{
    });
  }
 
  onBlurMethod(){
    this.myModel = [];
   
    if(this.option1 != null && this.option1 != ""){
      this.myModel.push(this.option1);
    }
    if(this.option2 != null && this.option2 != ""){
      this.myModel.push(this.option2);
    }
    if(this.option3 != null && this.option3 != ""){
      this.myModel.push(this.option3);
    }
    if(this.option4 != null && this.option4 != ""){
      this.myModel.push(this.option4);
    }
    if(this.option5 != null && this.option5 != ""){
      this.myModel.push(this.option5);
    }
    if(this.option6 != null && this.option6 != ""){
      this.myModel.push(this.option6);
    }

    //console.log("myModel",this.myModel);
  }
  submit(){
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    if(this.selectedType== undefined || this.selectedType== ""){
      this.util.showToast("Please select Question Type","ERROR");
      return;
    } 
    if(this.selectDomain== undefined || this.selectDomain == ""){
      this.util.showToast("Please select Question Domain","ERROR");
      return;
    } 
    if(this.level== undefined || this.level == ""){
      this.util.showToast("Please select Question Level","ERROR");
      return;
    } 
    if(this.questionName== undefined || this.questionName == ""){
      this.util.showToast("Please select Question Name","ERROR");
      return;
    } 
    if(this.selectedType == 'Objective'){
      if(this.option1== undefined || this.option1 == ""){
        this.util.showToast("Please select Option 1","ERROR");
        return;
      } 
      if(this.option2== undefined || this.option2 == ""){
        this.util.showToast("Please select Option 2","ERROR");
        return;
      } 
      if(this.finalAnswer== undefined || this.finalAnswer == ""){
        this.util.showToast("Please select Preffered Answer","ERROR");
        return;
      } 
    }else{
      if(this.finalAnswer== undefined || this.finalAnswer == ""){
        this.util.showToast("Please select Preffered Answer","ERROR");
        return;
      } 
    }
  
    let jsonData = {
      "positionId":this.reqId,
      "questionType":"Technical",
      seqId: this.seqId++,
      technicalQuestion:{
        "answer":this.finalAnswer,
        "domain":this.selectDomain,
        "level":this.level,
        "option1":this.option1,
        "option2":this.option2,
        "option3":this.option3,
        "option4":this.option4,
        "option5":this.option5,
        "option6":this.option6,
        "questionName":this.questionName,
        "type":this.type
      },
      userJwtBean:{
        "emailId":this.loginUser.emailId,
        "firstName":this.loginUser.firstName,
        "id":this.loginUser.id,
        "lastName":this.loginUser.lastName,
        "role":this.loginUser.role,
        "userName":this.loginUser.userName
      }

    }
    //console.log("json",jsonData);
    loading.present();   
      this.restProvider.addTechnicalQuestion( this.token,jsonData)
        .then(data => {
         
          loading.dismiss();
          this.util.showToast("Successfully Submitted.","SUCCESS");
        //   console.log("data",data); 
        },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
        //  console.log(error);
        });
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

  goBack(){
    this.viewCtrl.dismiss(DisplayQuestionsPage);
  //  console.log("generalModuleccccccccccccc",this.generalModule)
  
  }
  close(){
   // this.viewCtrl.dismiss();
    this.navCtrl.push(RequirementsPage)

  }
}
