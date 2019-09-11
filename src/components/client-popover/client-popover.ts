import { Component } from '@angular/core';
import {IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { ChangeAcntMgrPage }  from '../../pages/change-acnt-mgr/change-acnt-mgr';
import { AccManagerPage }  from '../../pages/acc-manager/acc-manager';

/**
 * Generated class for the ClientPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'client-popover',
  templateUrl: 'client-popover.html'
})
export class ClientPopoverComponent {

  text: string;
  token:string;
  CId:string;
  clientName:string;
  isBlackListed:string;
  result:any;
  loginUser:string;
  enabled:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ,
    public alertCtrl: AlertController,
    public viewCtrl : ViewController){
      this.token = this.util.getToken();
      this.CId = navParams.get('id');
      this.clientName = navParams.get('clientName');
      this.enabled = navParams.get('enabled');
      this.isBlackListed = navParams.get('isBlackListed');
      this.loginUser = this.util.getSessionUser();
      console.log('enabled',this.enabled);
    }

  disableClients(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Disable:'+this.clientName,
      message: 'Please confirm to disable the client:'+this.clientName+'?',
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
            this.restProvider.enableDisableClient(this.token, this.CId,this.loginUser)
            .then(res => {
              this.result = res;
              loading.dismiss();
              this.util.showToast("Client Disable sucessfuly","SUCCESS");
              console.log("hhhhhhhhhhhh",res);
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
              console.log("bbbbbbbbbbb",error);
            })
            this.restProvider.getClients(this.token,this.loginUser)
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

  enableClients(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Enable :'+this.clientName,
      message: 'Please confirm to enable the client:'+this.clientName+'?',
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
            this.restProvider.enableDisableClient(this.token, this.CId,this.loginUser)
            .then(res => {
              this.result = res;
              loading.dismiss();
              this.util.showToast("Client Disable sucessfuly","SUCCESS");
              console.log("hhhhhhhhhhhh",res);
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
              console.log("bbbbbbbbbbb",error);
            })
            this.restProvider.getClients(this.token,this.loginUser)
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
      title: 'Blacklist :'+this.clientName,
      message: 'Are you sure you want to Blacklist this client:'+this.clientName+'?',
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
            'clientId': this.CId,
           
            }
           
  
            loading.present();
            this.restProvider.updateVendorBlackListStatus(this.token,jsonData)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Updated  sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
  
            this.restProvider.getClients(this.token,this.loginUser)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
             // this.util.showToast("Added sucessfuly","SUCCESS");
             
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

  removeBlacklist(){
    let confirm = this.alertCtrl.create({
      title: 'Remove Blacklist : '+this.clientName,
      message: 'Are you sure you want to remove Blacklisting of this Client:'+this.clientName+'?',
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
            'clientId': this.CId,
           
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
  
            this.restProvider.getClients(this.token,this.loginUser)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
             // this.util.showToast("Added sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
            //  this.util.showToast("Something went wrong.","ERROR");
            })
          }
        }
      ]
    });
    confirm.present();
  }
  changeAccountManager(){
    this.navCtrl.push(ChangeAcntMgrPage,{CId:this.CId});
    
  }
}
