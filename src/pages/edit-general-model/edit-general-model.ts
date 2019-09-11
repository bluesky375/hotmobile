import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { GeneralQuestionPage }  from '../../pages/general-question/general-question';

/**
 * Generated class for the EditGeneralModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-general-model',
  templateUrl: 'edit-general-model.html',
})
export class EditGeneralModelPage {
  token:string;
  id:string;
  userid:string;
  details:any={};
  myModel:any;
  loginUser:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public viewCtrl : ViewController,
    public loadingCtrl: LoadingController,) {
    this.userid = navParams.get('userid');
    this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
      this. editGenerals();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGeneralModelPage');
  }
  onSelectChange(selectedValue) {
    this.myModel = selectedValue;
    console.log('Selected', this.myModel);
    //console.log('selectedValue', selectedValue);
  
  }
  editGenerals(){
    this.restProvider.editgenQuestion(this.token,this.userid)
   .then((data:any)=>{
      this.details =data;
   console.log("userDetails",this.details);
   },errrr=>{
     //console.log(errrr);
   });
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
     
    
    generalQuestion:{
      addToPosition:this.details.addToPosition,
      id:this.details.id,
      option1:this.details.option1,
      option2:this.details.option2,
      option3:this.details.option3,
      option4:this.details.option4,
      option5:this.details.option5,
      option6:this.details.option6,
      questionName:this.details.questionName,
      type:this.details.type
    },
    questionType:"General",
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
