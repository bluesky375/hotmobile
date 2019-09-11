import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { PaymentDetailsPage }  from '../../pages/payment-details/payment-details';

/**
 * Generated class for the AccountsPaidHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accounts-paid-history',
  templateUrl: 'accounts-paid-history.html',
})
export class AccountsPaidHistoryPage {
  loginUser:any={};
  token:string;
  accountant:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.Accountpaid();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ClientsPage');
  }

  Accountpaid(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.AccountsPaid(this.token)
    .then( res=> {
      this.accountant = res;
      console.log('this.Clients',this.accountant);
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  goBack(){
    this.navCtrl.pop();
  }
  paymentDetails(details){
    this.navCtrl.push(PaymentDetailsPage,{reqId:details.positionId,tsId:details.tsId,jobTitle:details.jobTitle});
    console.log("helllo",details.positionId);
  }
}
