import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { ScreenerDetailModalPage }  from '../../pages/screener-detail-modal/screener-detail-modal';
import { TechnicalScreenerDetailsPage }  from '../../pages/technical-screener-details/technical-screener-details';
import { HomePage } from '../home/home';


/**
 * Generated class for the ScreenerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-screener-list',
  templateUrl: 'screener-list.html',
})
export class ScreenerListPage {
  token:string;
  loginUser:any = {};
  techscreener:any={};
  userSet:any;
  userVideoLink:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public util: UtilsProvider,
    public restProvider:RestProvider,
    public viewCtrl : ViewController,
    
    public modalCtrl:ModalController,) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.TechnicalScreener();

      console.log('this.token',this.token);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreenerListPage');
  }

  TechnicalScreener(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.TechnicalScreener(this.token)
    .then( res=> {
      this.techscreener = res;
      this.userSet = this.techscreener.userSet;
      this.userVideoLink =  this.userSet.userVideoLink;
      console.log('this.userVideoLink',this.userVideoLink);
    
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  viewDetails(id){
    let chooseModal = this.modalCtrl.create(ScreenerDetailModalPage,{userid:id});
    console.log("this.userIdccccccccccc",id)
    chooseModal.present(); 
  }
  createScreener(){
    this.navCtrl.push(TechnicalScreenerDetailsPage);
  }

  goBack()
  {
    this.navCtrl.push(HomePage)

  }
}
