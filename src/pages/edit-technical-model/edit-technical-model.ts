import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { GeneralQuestionPage }  from '../../pages/general-question/general-question';
/**
 * Generated class for the EditTechnicalModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-technical-model',
  templateUrl: 'edit-technical-model.html',
})
export class EditTechnicalModelPage {
  token:string;
  id:string;
  userid:string;
  details:any={};
  myModel:any;
  loginUser:any;
   
  option1:string;
  option2:string;
  option3:string;
  option4:string;
  option5:string;
  option6:string;
  domains:any;
  selectedType:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public viewCtrl : ViewController,
    public loadingCtrl: LoadingController,) {
    this.userid = navParams.get('userid');
    this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
      //this.myModel=[];
      this. editGenerals();
      this. domainNames();
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

      console.log("myModel",this.myModel);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGeneralModelPage');
  }
  onSelectChange(selectedValue) {
    this.selectedType = selectedValue;
   // console.log('Selected', this.myModel);
    //console.log('selectedValue', selectedValue);
  
  }
  domainNames(){
    this.restProvider.domain(this.token)
    .then((res:any)=>{
      this.domains = res;
      
    },errrr=>{
    });
  }

 
  
  editGenerals(){
    this.restProvider.editTechQuestion(this.token,this.userid)
   .then((data:any)=>{
      this.details =data;
      this.option1 = this.details.option1;
      this.option2 = this.details.option2;
      this.option3 = this.details.option3;
      this.option4 = this.details.option4;
      this.option5 = this.details.option5;
      this.option6 = this.details.option6;
      //this.myModel.push(this.option1);
     
     this.myModel=[ this.option1, this.option2, this.option3, this.option4]
      console.log("option1",this.details.option1);
      console.log("myModel",this.myModel);
   
   console.log("userDetails",this.details.answer);
   },errrr=>{
     //console.log(errrr);
   });
 }
 onBlurMethod(){

 

  
}
 
  
goBack(){
  this.viewCtrl.dismiss();
}
closeModal(){
  this.viewCtrl.dismiss();
}
 updateClient(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  let jsonData = {
     
    
    technicalQuestion:{
     
      id:this.details.id,
      option1:this.details.option1,
      option2:this.details.option2,
      option3:this.details.option3,
      option4:this.details.option4,
      option5:this.details.option5,
      option6:this.details.option6,
      questionName:this.details.questionName,
      type:this.details.type,
      answer:this.details.answer,
      domain:this.details.domain,
      level:this.details.level,
      otherDomain:null,
    },
    questionType:"Technical",
    userJwtBean: {
      emailId: this.loginUser.emailId,
      firstName: this.loginUser.firstName,
      id: this.loginUser.id,
      lastName: this.loginUser.lastName,
      role: this.loginUser.role,
      userName: this.loginUser.userName
    }
  }
  loading.present();
  this.restProvider.updateQuestion(this.token,jsonData)
  .then((data:any) => {
    this.navCtrl.push(GeneralQuestionPage);
      loading.dismiss();
      this.util.showToast("Updated successfully.","ERROR");
    
  },error => {
      this.util.showToast("Something went wrong.","ERROR");
    
  });
  
 }

}
 
