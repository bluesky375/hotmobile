import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { DisplayQuestionsPage }  from '../../pages/display-questions/display-questions';
import { AddGeneralPage }  from '../../pages/add-general/add-general';
import { EditGeneralModelPage }  from '../../pages/edit-general-model/edit-general-model';


/**
 * Generated class for the GeneralQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-general-question',
  templateUrl: 'general-question.html',
})
export class GeneralQuestionPage {
  reqId:string;
  token:string;
  generals:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,
    public modalCtrl:ModalController,) {
    this.token = this.util.getToken();

    this.genquestion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneralQuestionPage');
  }

  genquestion(){
  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.genQuestion(this.token)
    .then((data:any) => {
        this.generals = data;
        loading.dismiss();
     //console.log("hhhhhasdsdhh",this.generals);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
       // loading.dismiss();
       // console.log(error);
    });
    
  }
  goBack(){
    this.viewCtrl.dismiss();
  }

  gotoTechnicals(){
    this.navCtrl.push(DisplayQuestionsPage);
 
  }
  addGeneral(){
    this.navCtrl.push(AddGeneralPage);
  }

  editQusetion(id){
    let chooseModal = this.modalCtrl.create(EditGeneralModelPage,{userid:id});
    chooseModal.present();
    console.log("helllo",id);
  }
}
