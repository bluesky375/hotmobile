import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,PopoverController,ModalController ,ViewController,AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the PaymentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetailsPage {
  loginUser:any={};
  token:string;
  accountDetails:any;
  reqId:string;
  tsId:string;
  jobTitle:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController,
    public viewCtrl : ViewController,
    public alertCtrl: AlertController) {
      this.reqId =navParams.get('reqId');
      this.tsId =navParams.get('tsId');
      this.jobTitle =navParams.get('jobTitle');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.AccountsDetails();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ClientsPage');
  }

  AccountsDetails(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.AccountsPaymentDetails(this.token,this.reqId,this.tsId)
    .then( res=> {
      this.accountDetails = res;
      console.log('this.accountDetails',this.accountDetails);
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }

goBack(){
  this.navCtrl.pop();
}
gotoEditdetails(details){
  
    let confirm = this.alertCtrl.create({
      title: 'Reject Payment',
      message: 'Are you sure you want Reject Payment for Candidate:'+details.firstName,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
            
            let jsonData = {
              'candidateId': details.candidateId,
              'rejectComment': "dont want",
              'requirementId':details.positionId
            }
            
           
            loading.present();
            this.restProvider.AccountsPaymentReject(this.token,jsonData)
            .then(res => {
             
              this.util.showToast("Link Submitted sucessfuly","SUCCESS");
              this.restProvider.AccountsPaymentDetails(this.token,this.reqId,this.tsId)
              .then( res=> {
               this.navCtrl.pop();
                loading.dismiss();
               
              },error => {
                loading.dismiss();
              });

            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })

           

          }
        }
      ]
    });
    confirm.present();
    
  }

  showPopup(details){
    let confirm = this.alertCtrl.create({
      title: 'Payment Rejected',
      message: 'Reason :' +details.rejectComment,
      buttons: [
        {
          text: 'close',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    confirm.present();
   alert("hhhhhhhhhhh");
    
  }
}
