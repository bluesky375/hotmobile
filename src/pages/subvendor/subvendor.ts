import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { SubvendorPopoverComponent }  from '../../components/subvendor-popover/subvendor-popover';
import { EditSubvendorPage }  from '../../pages/edit-subvendor/edit-subvendor';
import { CreateSubvendorPage }  from '../../pages/create-subvendor/create-subvendor';
import { HomePage } from '../home/home';

/**
 * Generated class for the SubvendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subvendor',
  templateUrl: 'subvendor.html',
})
export class SubvendorPage {
  loginUser:any={};
  token:string;
  subvendor:any;
  subVendorsList:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.getSubVendors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubvendorPage');
  }

  getSubVendors(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getSubVendors(this.token)
    .then( res=> {
      this.subvendor = res;
      this.subVendorsList =this.subvendor.subVendorsList
      console.log('this.subvendor',this.subvendor);
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }

  presentPopover(myEvent,subvendor){
    let popover = this.popoverCtrl.create(SubvendorPopoverComponent,subvendor);
    popover.present({
     ev: myEvent  
     
    });
    console.log("subvendor",subvendor);
  }

  gotoEditSubvendor(vendor){
    this.navCtrl.push(EditSubvendorPage,{vId:vendor.id});
    
  }
  createSubvendor(){
    this.navCtrl.push(CreateSubvendorPage);
    
  }

  goBack(){
    this.navCtrl.push(HomePage)

  }
}
