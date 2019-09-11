import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the AddcontactmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcontactmodal',
  templateUrl: 'addcontactmodal.html',
})
export class AddcontactmodalPage {
  firstName:string;
  lastName:string;
  userName:string;
  emailId:string;
  contactNumber:string;
  alternateContact:string;
  contactId:string;
  loginUser:any;
  token:string;
  sendUserEmail:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider) {
      this.contactId = navParams.get('contactid');
      this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();

      console.log(' this.contactId', this.contactId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcontactmodalPage');
  }
  addData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if(this.firstName == undefined || this.firstName == "" ){
      this.util.showToast("Please enter First Name.","ERROR");
      return;
    }
    if(!this.util.nameValidate(this.firstName) ){
      this.util.showToast("Name should be characters only","ERROR");
      return;
    }

    if(this.lastName == undefined || this.lastName == ""){
      this.util.showToast("Please enter Last Name.","ERROR");
      return;
    }
    if(!this.util.nameValidate(this.lastName) ){
      this.util.showToast("Name should be characters only","ERROR");
      return;
    }

    if(this.userName == undefined || this.userName == ""){
      this.util.showToast("Please enter User Name.","ERROR");
      return;
    }

    if(this.emailId == undefined || this.emailId == "" ){
      this.util.showToast("Please enter  Email Id.","ERROR");
      return;
      
    }
    if(!this.util.emailValidate(this.emailId)){
      this.util.showToast("Please enter valid Email Id.","ERROR");
      return;
    }
    if(this.contactNumber == undefined || this.contactNumber == "" ){
      this.util.showToast("Please enter  Contact.","ERROR");
      return;
      
    }
    if(!this.util.contactValidate(this.contactNumber)){
      this.util.showToast("Please enter Correct Number.","ERROR");
      return;
    }

    if(!this.util.contactValidate(this.alternateContact)){
      this.util.showToast("Please enter Correct alternate Number.","ERROR");
      return;
    }
   
 
    

    let jsonData = {
     
      clientContacts :{
        'firstName':this.firstName,
        'lastName':this.lastName,
        'userName':this.userName,
        'emailId':this.emailId,
        'contactNumber':this.contactNumber,
        'alternateContact':this.alternateContact,
        'client_id': this.contactId,
        'sendUserEmail': false,
        'contactFullName':this.firstName +this.lastName

      },
      clientId: this.contactId,
      jwtUserDetails: {
        emailId: this.loginUser.emailId,
        firstName: this.loginUser.firstName,
        id: this.loginUser.id,
        lastName: this.loginUser.lastName,
        role: this.loginUser.role,
        userName: this.loginUser.userName,
      },
      user:{
        'firstName':this.firstName,
        'lastName':this.lastName,
        'userName':this.userName,
        'emailId':this.emailId,
        'contactNumber':this.contactNumber,
        'alternateContact':this.alternateContact,
        'sendUserEmail': false,
        'role': "Client"
      }
       
      
    }
     
    loading.present();   
      this.restProvider.addContact(jsonData,this.token)
        .then(data => {
          loading.dismiss();
          this.util.showToast("Successfully Submitted.","SUCCESS");
          this.viewCtrl.dismiss('SUCCESS');
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
