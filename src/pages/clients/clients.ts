import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { ClientPopoverComponent }  from '../../components/client-popover/client-popover';
import { EditClientPage }  from '../../pages/edit-client/edit-client';
import { CreateClientPage }  from '../../pages/create-client/create-client';
import { HomePage } from '../home/home';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {
  loginUser:any={};
  token:string;
  Clientslist:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ) {
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.getClients();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ClientsPage');
  }

  getClients(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getClients(this.token,this.loginUser)
    .then( res=> {
      this.Clientslist = res;
      console.log('this.Clients',this.Clientslist);
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }

  presentPopover(myEvent,Clientslist){
    let popover = this.popoverCtrl.create(ClientPopoverComponent,Clientslist);
    popover.present({
     ev: myEvent  
     
    });
    console.log("Clientslist",Clientslist);
  }

  gotoEditClient(Client){
    this.navCtrl.push(EditClientPage,{CId:Client.id});
    console.log("helllo",Client.id);
  }
  createClients(){
    this.navCtrl.push(CreateClientPage);
    
  }
  goBack(){
    this.navCtrl.push(HomePage)
  }
}
