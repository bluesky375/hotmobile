import { Component } from '@angular/core';
import { ViewController, AlertController,LoadingController,NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the UserActionPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-action-popover',
  templateUrl: 'user-action-popover.html'
})
export class UserActionPopoverComponent {

  text: string;
  userId:string;
  token:any;
  userObj:Array<Object> = [];
  user:any;
  statusStr:string;
  status:boolean;
  loginUser:any;
  constructor(public viewCtrl: ViewController,
    
    public alertCtrl:AlertController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public util:UtilsProvider ,
    public navParams: NavParams) {
    
      this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
    this.user = navParams.get('user');
     if(this.user.enabledStatus == "Inactive"){
       this.statusStr = "Enable";
       this.status = false;
     }else{ 
      this.statusStr = "Disable";
      this.status = true;
     }

    console.log(this.statusStr);
    this.text = 'Hello World';
    this.token = this.util.getToken();
  }

  disableUser(id,token) {
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Disable User',
      message: 'Are you sure you want to '+this.statusStr+' this user : '+this.user.userName,
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
           this.changeUserStatus();
          }
        }
      ]
    });
    confirm.present();
   
  }
  
  changeUserStatus(){
    let jsonData = {
      "status": this.status,
      "userId": this.user.id,
      "userJwtBean": {
        "emailId": this.loginUser.emailId,
        "firstName": this.loginUser.firstName,
        "id": this.loginUser.id,
        "lastName": this.loginUser.lastName,
        "role": this.loginUser.role,
        "userName": this.loginUser.userName
      }
    }

    this.restProvider.changeUserStatusById(jsonData,this.token)
    .then(res => {
      this.util.showToast("Status changed sucessfuly","SUCCESS");
        //Email Send to user
        this.restProvider.changeUserStatusSendEmailById(jsonData,this.token)
        .then(res => {
        },error => {
          
        });
    },error => {
      this.util.showToast("Something went wrong.","ERROR");
    });
  }
  resetPassword(){
    this.viewCtrl.dismiss();
    let confirm = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Are you sure you want to Reset password for this user?',
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
          this.changeUserpassword();
          }
        }
      ]
    });
    confirm.present();
  }
  
  changeUserpassword(){
    let jsonData = {
      "status": this.status,
      "userId": this.user.id,
      "userJwtBean": {
        "emailId": this.loginUser.emailId,
        "firstName": this.loginUser.firstName,
        "id": this.loginUser.id,
        "lastName": this.loginUser.lastName,
        "role": this.loginUser.role,
        "userName": this.loginUser.userName
      }
    }

    this.restProvider.changeUserpasswordById(jsonData,this.token)
    .then(res => {
      this.util.showToast("Password changed sucessfuly","SUCCESS");
        //Email Send to user
        this.restProvider.changeUserpasswordsendMailById(jsonData,this.token)
        .then(res => {
        },error => {
          
        });
    },error => {
      this.util.showToast("Something went wrong.","ERROR");
    });
  }
  
  downloadResume(){
    let jsonData = {
      "status": this.status,
      "userId": this.user.id,
      "userJwtBean": {
        "emailId": this.loginUser.emailId,
        "firstName": this.loginUser.firstName,
        "id": this.loginUser.id,
        "lastName": this.loginUser.lastName,
        "role": this.loginUser.role,
        "userName": this.loginUser.userName
      }
    }

    this.restProvider.downloadCandidateResume(this.token,this.user.id,this.loginUser)
    .then(res => {
      this.util.showToast("Resume downloaded  sucessfuly","SUCCESS");
        //Email Send to user
    },error => {
      this.util.showToast("Something went wrong.","ERROR");
    });
  }
}
