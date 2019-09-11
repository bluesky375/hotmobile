import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
/**
 * Generated class for the CloseReqPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'close-req-popover',
  templateUrl: 'close-req-popover.html'
})
export class CloseReqPopoverComponent {

  text: string;
  token:string;
  loginUser:any = {};
  accMgr:any;
  reqId:string;
  jobTitle:string;
  reason:string;
  description:string;

  constructor( public navParams: NavParams,
     public loadingCtrl:LoadingController,
    public util: UtilsProvider,
    public restProvider:RestProvider,
    public viewCtrl : ViewController) {
      this.reqId = navParams.get('reqId');
      this.jobTitle = navParams.get('jobTitle');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
    console.log('Hello CloseReqPopoverComponent Component');
   
  }

  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
   
    
    if(this.reason == undefined || this.reason == ""){
      this.util.showToast("Please select reason.","ERROR");
      return;
    }
  
    if(this.description == undefined || this.description == "" ){
      this.util.showToast("Please enter description.","ERROR");
      return;
      
    }
   

    let jsonData = {
     'emailId' : this.loginUser.emailId,
      'firstName':  this.loginUser.firstName,
      'id':  this.loginUser.id,
      'lastName':  this.loginUser.lastName,
      'requirementId': this.reqId,
      'role':  this.loginUser.role,
      'status': "Open",
      'userName':  this.loginUser.userName
   

    }
    console.log("json",jsonData);
    loading.present();   
      this.restProvider.opencloseMail( this.token,this.reqId,jsonData)
        .then(data => {
         
          loading.dismiss();
          this.util.showToast("Successfully Submitted.","SUCCESS");
           console.log("data",data); 
        },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });

        let jsonData2 = {
          'openCloseDescription' : this.description,
           'openCloseReason':  this.reason,
           'requirementId': this.reqId,
           'status':"Open",
         
           'user':this.loginUser
     
         }
         jsonData2.user.groupsSet =[];
         jsonData2.user.technicalScreenerDetailsSkillsSet =[];
         console.log("json",jsonData2);
         loading.present();   
           this.restProvider.openclose( this.token,jsonData2)
             .then(data => {
              
               loading.dismiss();
               this.util.showToast("Successfully Submitted.","SUCCESS");
                console.log("data",data); 
             },error => {
                 loading.dismiss();
                 this.util.showToast("Something went wrong.","ERROR");
                 console.log(error);
             });
     

    
  }

  cancelData(){
    this.viewCtrl.dismiss();
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }

  
  
}
