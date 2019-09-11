import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { HomePage } from '../home/home';

/**
 * Generated class for the ViewAllScreenerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-all-screener',
  templateUrl: 'view-all-screener.html',
})
export class ViewAllScreenerPage {
  token:string;
  loginUser:any = {};
  techscreener:any={};
  userSet:any;
  userVideoLink:any;
  trackTSc:any;
  newtrackTSc:any[] = [];

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
    this.restProvider.trackTS(this.token)
    .then( res=> {
      this.trackTSc = res;
      this.newtrackTSc= this.trackTSc.tsTackingList;
      loading.dismiss();
      //console.log("this.trackRecr",this.newtrackRecr);
    },error => {
      loading.dismiss();
    });
    
  
     
  
  }

  goBack()
  {
    this.navCtrl.push(HomePage)

  }

}
