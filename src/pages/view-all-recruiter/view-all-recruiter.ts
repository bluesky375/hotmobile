import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { HomePage } from '../home/home';

/**
 * Generated class for the ViewAllRecruiterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-all-recruiter',
  templateUrl: 'view-all-recruiter.html',
})
export class ViewAllRecruiterPage {
  token:string;
  loginUser:any = {};
  techscreener:any={};
  userSet:any;
  userVideoLink:any;
  trackRecr:any;
  newtrackRecr:any[] = [];
  date:any={};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public util: UtilsProvider,
    public restProvider:RestProvider,
    public viewCtrl : ViewController,
    
    public modalCtrl:ModalController,) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.Recruiter();
this.date ={
  fromDate:null,
  toDate:null
}
      console.log('this.token',this.token);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScreenerListPage');
  }

  Recruiter(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.trackRec(this.date,this.token)
    .then( res=> {
      this.trackRecr = res;
      this.newtrackRecr= this.trackRecr.recTackingList;
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
