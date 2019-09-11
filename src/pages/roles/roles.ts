import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController  } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { HomePage } from '../home/home';
import { CreaterolesPage } from '../createroles/createroles';
import { EditrolePage } from '../editrole/editrole';
import { App,MenuController } from 'ionic-angular';


/**
 * Generated class for the RolesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roles',
  templateUrl: 'roles.html',
})
export class RolesPage {
  roles:any;
  rolesName:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public restProvider: RestProvider,
        public loadingCtrl: LoadingController,                
        public util:UtilsProvider,public alertCtrl: AlertController,public menuCtrl: MenuController,public app:App ) {
    // this.candidate = this.restProvider.getRoles((token:any)=>token);
    this.getRoles(this.util.getToken());
    console.log(this.roles);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RolesPage');
  }

  backtoHome(){
    this.navCtrl.pop();
  }

  getRoles(token){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getRoles(token)
    .then(data => {
        this.roles = data;
        loading.dismiss();
      console.log(this.roles);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
        loading.dismiss();
        console.log(error);
    });
    
  }

  deleteRole(id){
    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete this role?',
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
              roleId:id,
              loginUser:this.util.getSessionUser()
            }
            let token = this.util.getToken();
            loading.present();
            this.restProvider.deleteRoles(jsonData,token)
            .then(res => {
              loading.dismiss();
              this.util.showToast("Role deleted sucessfuly","SUCCESS");
              this.getRoles(token);
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

  gotoEditRole(role){
    this.navCtrl.push(EditrolePage,{roleId:role.id,rname:role.groupName});
    console.log("id is::::",role);
  }
  gotoState(){
    this.navCtrl.push(CreaterolesPage);
  }
  goBack(){
    this.navCtrl.push(HomePage)
  }

}
