import { Component } from '@angular/core';
import {IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the SubvendorPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'subvendor-popover',
  templateUrl: 'subvendor-popover.html'
})
export class SubvendorPopoverComponent {

  text: string;
  token:string;
  subVendorName:string;
  subId:string;
  isBlackListed:string;
  result:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ,
    public alertCtrl: AlertController,
    public viewCtrl : ViewController,){
      this.token = this.util.getToken();
      this.subVendorName = navParams.get('subVendorName');
      this.subId = navParams.get('id');
      this.isBlackListed = navParams.get('isBlackListed');
      
    console.log('this.subId',this.subId);
    console.log('this.subVendorName',this.subVendorName);
    
  }
  deleteVendors(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Delete Sub-Vendor:'+this.subVendorName,
      message: 'Are you sure you want to Delete this Sub-Vendor:'+this.subVendorName+'?',
      buttons: [
        {
          text: 'No',
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
            
           
            loading.present();
            this.restProvider.deleteSubVendor(this.token, this.subId)
            .then(res => {
              this.result = res;
              loading.dismiss();
              this.util.showToast("subvendor deleted sucessfuly","SUCCESS");
              //console.log("hhhhhhhhhhhh",res);
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
              //console.log("bbbbbbbbbbb",error);
            })
            this.restProvider.getSubVendors(this.token)
            .then(res => {
              loading.dismiss();
             // this.util.showToast("subvendor deleted sucessfuly","SUCCESS");
              
            },error => {
              loading.dismiss();
             // this.util.showToast("Something went wrong.","ERROR");
            })
          }
        }
      ]
    });
    confirm.present();
  }
  blacklist(){
    let confirm = this.alertCtrl.create({
      title: 'Blacklist :'+this.subVendorName,
      message: 'Are you sure you want to Blacklist this SubVendor:'+this.subVendorName+'?',
      buttons: [
        {
          text: 'No',
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
           
            'blackListReason': 'ddddd',
            'isBlackListed':  this.isBlackListed,
            'subVendorId': this.subId,
           
            }
           
  
            loading.present();
            this.restProvider.updateVendorBlackListStatus(this.token,jsonData)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Added sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
  
            this.restProvider.getSubVendors(this.token)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Added sucessfuly","SUCCESS");
             
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

  removeBlacklist(){
    let confirm = this.alertCtrl.create({
      title: 'Remove Blacklist : '+this.subVendorName,
      message: 'Are you sure you want to remove Blacklisting of this SubVendor :'+this.subVendorName+'?',
      buttons: [
        {
          text: 'No',
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
           
            'blackListReason': 'ddddd',
            'isBlackListed':  this.isBlackListed,
            'subVendorId': this.subId,
           
            }
           
  
            loading.present();
            this.restProvider.updateVendorBlackListStatus(this.token,jsonData)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Added sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
  
            this.restProvider.getSubVendors(this.token)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Added sucessfuly","SUCCESS");
             
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
  
}
