import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the EditrolePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editrole',
  templateUrl: 'editrole.html',
})
export class EditrolePage {
role:any = {};
rolls:any;
token:any;
roleId:string;
roleName:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util:UtilsProvider,
    public restProvider :RestProvider) {
      this.token = this.util.getToken();
      this.roleId = navParams.get('roleId');
      this.roleName = navParams.get('rname');
      this.getPermissionByRoleId(this.roleId,this.token); 
     
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditrolePage');
  }
  getPermissionByRoleId(roleId,token){
  this.restProvider.getRolesById(roleId,token)
  .then(data => {
    this.role= data;
    //console.log(roleName);
    
  },error => {
      this.util.showToast("Something went wrong.","ERROR");
     
      console.log(error);
  });
  } 
  isReadonly() {
    return this.isReadonly;   //return true/false 
  }
  goBack(){
    this.navCtrl.pop()
  }
  submit(){
    this.navCtrl.pop() 
  }
}
