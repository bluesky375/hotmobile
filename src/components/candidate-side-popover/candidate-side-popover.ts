import { Component } from '@angular/core';
import {App,IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { CandidateHisModalPage }  from '../../pages/candidate-his-modal/candidate-his-modal';

import { File } from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
/**
 * Generated class for the CandidateSidePopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'candidate-side-popover',
  templateUrl: 'candidate-side-popover.html'
})
export class CandidateSidePopoverComponent {

  text: string;
  token:string;
  isBlackListed:string;
  result:any;
  loginUser:string;
  firstName:string;
  canId:string;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ,
    public alertCtrl: AlertController,
    public viewCtrl : ViewController,
    public modalCtrl:ModalController,
    public appCtrl: App,
    private transfer: FileTransfer, private file: File,
    private document :DocumentViewer){
      this.token = this.util.getToken();
      this.isBlackListed = navParams.get('isBlackListed');
      this.firstName = navParams.get('firstName');
      this.canId = navParams.get('candidateId');
      console.log("this.isBlackListed ",this.isBlackListed );
      this.loginUser = this.util.getSessionUser();
      
  }

  deleteCandidate(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Delete:'+this.firstName,
      message: 'Are you sure you want to Delete this Candidate:'+this.firstName+'?',
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
            this.restProvider.deleteCandidate(this.token, this.canId,this.loginUser)
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
  
  historyCandidate(){
    this.appCtrl.getRootNav().push(CandidateHisModalPage,{canId:this.canId});
    this.viewCtrl.dismiss();

    console.log("bbbbbbbbbbb",this.canId); 
  }
  blacklistClient(){
    let confirm = this.alertCtrl.create({
      title: 'Blacklist :'+this.firstName,
      message: 'Are you sure you want to Blacklist this Candidate:'+this.firstName+'?',
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
            'candidateId': this.canId,
           
            }
           
  
            loading.present();
            this.restProvider.updateCandidateBlackListStatus(jsonData,this.token)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Added sucessfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
  
            this.restProvider.getCandidates(this.token)
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
      title: 'Remove Blacklist  :'+this.firstName,
      message: 'Are you sure you want to remove Blacklisting of this Candidate:'+this.firstName+'?',
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
            'candidateId': this.canId,
           
            }
           
  
            loading.present();
            this.restProvider.updateCandidateBlackListStatus(jsonData,this.token)
            .then(data => {
              //this.ccRequirement = data;
              loading.dismiss();
              this.util.showToast("Removed successfuly","SUCCESS");
             
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
            })
  
            this.restProvider.getCandidates(this.token)
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

  downloadResume(){
    let path = null;
    path = this.file.dataDirectory;
    this.restProvider.downloadCandidateResume(this.token,this.canId,this.loginUser)
    .then((data:any) => { 
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
      
    });
  }
}
