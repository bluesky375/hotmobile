import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ViewController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
//import { GeneralQuestionsPage }  from '../../pages/general-questions/general-questions';
import { AddTechnicalPage }  from '../../pages/add-technical/add-technical';
import { EditTechnicalModelPage }  from '../../pages/edit-technical-model/edit-technical-model';
import { AddGeneralPage }  from '../../pages/add-general/add-general';
import { HomePage } from '../home/home';


/**
 * Generated class for the DisplayQuestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-display-questions',
  templateUrl: 'display-questions.html',
})
export class DisplayQuestionsPage {
  reqId:string;
  token:string;
  technicals:string;
  generals:string;
  technicalModule:boolean;
  generalModule: boolean ;
  viewgeneralButton:boolean;
  viewtechnicalButton:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,
    public util: UtilsProvider,
    public modalCtrl:ModalController) {
    this.token = this.util.getToken();
      
   
    this.techquestion();
    this.genquestion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TechnicalQuestionPage');
  }
 techquestion(){
  this.generalModule = false;
  this.technicalModule = true;
  
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.techQuestion(this.token)
    .then((data:any) => {
        this.technicals = data;
        loading.dismiss();
    // console.log("hhhhhasdsdhh",this.technicals);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
       // loading.dismiss();
       // console.log(error);
    });
    
  }
  genquestion(){
    this.technicalModule = false;
    this.generalModule = true;
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
  gotoGeneral(){
    this.technicalModule = false;
    this.generalModule = true;
    this.viewgeneralButton = true;
  }
  gotoTechnical(){
    this.generalModule = false;
    this.technicalModule = true;
    this.viewtechnicalButton = true;
   

console.log('this.technicalModule',this.technicalModule)
  }
  goBack(){
    this.navCtrl.push(HomePage)

 }
 addTechnical(){
  this.navCtrl.push(AddTechnicalPage, {'generalModule':this.generalModule=false,viewtechnicalButton:this.viewgeneralButton});
// console.log("this.generalModule",this.generalModule);

 
 }
 addGeneral(){
  this.navCtrl.push(AddGeneralPage, {'technicalModule':this.technicalModule=false,viewgeneralButton: this.viewgeneralButton = true});
// console.log("this.technicalModule",this.technicalModule);

 }
 editQusetion(id){
  let chooseModal = this.modalCtrl.create(EditTechnicalModelPage,{userid:id});
  chooseModal.present();
  console.log("helllo",id);
}
}
