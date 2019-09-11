import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the ChangeAcntMgrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-acnt-mgr',
  templateUrl: 'change-acnt-mgr.html',
})
export class ChangeAcntMgrPage {
  token:string;
  loginUser:any = {};
  accMgr:any;
  CId:string;
  details:any;
  AccId:any={};
   selectedId='';
  constructor(  public loadingCtrl:LoadingController,
    public navParams: NavParams,
    public util: UtilsProvider,
    public restProvider:RestProvider,
    public viewCtrl : ViewController,
    
    public modalCtrl:ModalController,) {
      this.CId = navParams.get('CId');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.changeAccountManager();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeAcntMgrPage');
  }
  goBack(){
    this.viewCtrl.dismiss();
  }
  changeAccountManager(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.changeAccountManager(this.token,0)
    .then( res=> {
      this.accMgr = res;
      this.AccId =this.accMgr;
      console.log('this.accMgr',this.accMgr);
     // console.log('this.Accid',this.AccId);
      loading.dismiss();
      

     
    },error => {
      loading.dismiss();
    });
  }

 
 
  radioClicked(mgrId){
    
    this.selectedId=mgrId;
    console.log("selectedId",this.selectedId)
  }
  
  submitData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.changeClientAssigne(this.token,this.selectedId,this.loginUser,this.CId)
    .then( res=> {
      this.details = res;
      console.log('this.Clients',this.details);
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
    this.viewCtrl.dismiss();
  }
}
