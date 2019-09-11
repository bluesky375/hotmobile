import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { s } from '@angular/core/src/render3';
/**
 * Generated class for the CreateSubvendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-subvendor',
  templateUrl: 'create-subvendor.html',
})
export class CreateSubvendorPage {
  token:string;
  cId:string;
  reqId:string;
  workflowId:string;
  loginUser:any;
  details:any;
  vId:string;

  subVendorName:string;
  status:string;
  division:string;
  federalId:string;
  contactNumber:string;
  contactNumber2:string;
  faxNumber:string;
  notes:string;
  firstName:string;
  lastName:string;
  emailId:string;
  alternateContact:string;
  addressOne:string;
  addressTwo:string;
  city:string;
  country:string;
  state:string;
  zipCode:string;
  websiteUrl:string;
  subVendor_id:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController
    ) {
      this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
      this.cId=navParams.get('cId');  
      this.reqId=navParams.get('reqId');  
      this.vId=navParams.get('vId');  
      this.workflowId=navParams.get('workflowId'); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateSubvendorPage');
  }

  goBack(){
    this.viewCtrl.dismiss();
  }
  submitSubvendor(){
    let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  if(this.subVendorName == undefined || this.subVendorName == "" ){
    this.util.showToast("Please enter subVendorName .","ERROR");
    return;
  }

  if(this.status == undefined || this.status == "" ){
    this.util.showToast("Please enter status.","ERROR");
    return;
  }
  

  if(this.division == undefined || this.division == ""){
    this.util.showToast("Please enter division.","ERROR");
    return;
  }
  

  if(this.federalId == undefined || this.federalId == "" ){
    this.util.showToast("Please enter federalId.","ERROR");
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
  

    if(this.faxNumber == undefined || this.faxNumber == ""){
      this.util.showToast("Please enter faxNumber","ERROR");
      return;
   }

    if(this.notes == undefined || this.notes == ""){
      this.util.showToast("Please enter notes","ERROR");
      return;
    }
    if(this.websiteUrl == undefined || this.websiteUrl == "" ){
      this.util.showToast("Please select websiteUrl.","ERROR");
      return;
      
    }
    if(!this.util.urlValidate(this.websiteUrl)){
      this.util.showToast("Please enter Correct URL.","ERROR");
      return;
    }
    if(this.firstName == undefined || this.firstName == "" ){
      this.util.showToast("Please select firstName.","ERROR");
      return;
      
    }
    if(this.lastName == undefined || this.lastName == "" ){
      this.util.showToast("Please enter lastName.","ERROR");
      return;
      
    }
    if(this.emailId == undefined || this.emailId == "" ){
      this.util.showToast("Please select emailId.","ERROR");
      return;
      
    }
    if(!this.util.emailValidate(this.emailId)){
      this.util.showToast("Please enter Correct Email.","ERROR");
      return;
    }
   
  
  

  let jsonData = {
     
    subVendorContactDetailsList :[{
      alternateContact:this.alternateContact,
      contactNumber:this.contactNumber,
      emailId: this.emailId,
      firstName: this.firstName,
      lastName:  this.lastName,
      subVendor_id:  this.subVendor_id,
    }],
    subVendorDetails:{
      addressOne:this.addressOne,
      addressTwo:this.addressTwo,
      city:this.city,
      contactNumber:this.contactNumber2,
      country:this.country,
      division:this.division,
      faxNumber:this.faxNumber,
      federalId:this.federalId,
      notes:this.notes,
      state:this.state,
      status:this.status,
      subVendorName:this.subVendorName,
      websiteUrl:this.websiteUrl,
      zipCode:this.zipCode
    }
  }
  loading.present();   
    this.restProvider.createsubVendor(this.token,jsonData)
      .then(data => {
        loading.dismiss();
        this.util.showToast("Successfully Submitted.","SUCCESS");
        
      },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });
  }
}
