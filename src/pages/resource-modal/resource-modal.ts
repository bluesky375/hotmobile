import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the ResourceModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resource-modal',
  templateUrl: 'resource-modal.html',
})
export class ResourceModalPage {
  token:string;
  loginUser:any;
  userId:string;
  userDetails:any={};
  firstName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public viewCtrl : ViewController

    ) {
    this.userId =navParams.get('userId');
    this.token = this.util.getToken();
    this.loginUser = this.util.getSessionUser();
    this.getUserDetail();
   // console.log('userId',this.userId);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResourceModalPage');
  }
  getUserDetail(){
    this.restProvider.editUsers(this.userId,this.token )
    .then((data:any) => {
        this.userDetails = data;
        this.firstName = this.userDetails.firstName;

    },error => {
        
       // console.log(error);
    });
  }
  goBack(){
    this.viewCtrl.dismiss();
  }
}
