import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the EditSubvendorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-subvendor',
  templateUrl: 'edit-subvendor.html',
})
export class EditSubvendorPage {
  token:string;
  cId:string;
  reqId:string;
  workflowId:string;
  loginUser:any;
  details:any;
  vId:string;
  clientDetails:any={};
  clientContactList:any;

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
      console.log('this.vendorId',this.vId);
      this.editSubvendor();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubvendorPage');
  }

  editSubvendor(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   
      loading.present().then(()=>{
      this.restProvider.subVendorDetailsAndContact(this.token,this.vId)     
      .then((data:any)=>{
      this.details = data;
      this.clientDetails =this.details.clientDetails;
      this.clientContactList = this.details.clientContactList;
        loading.dismiss();
        console.log("this.details",this.details);
        console.log("this.clientDetails",this.clientDetails);
        console.log("this.clientContactList",this.clientContactList);

       //this.util.showToast("Successfully Submitted.","SUCCESS");
      },errrr=>{
        loading.dismiss();
        //this.util.showToast("Something went wrong.","ERROR");
      });
    });
  }

  goBack(){
    this.viewCtrl.dismiss();
  }

  updateSubvendor(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    let ContactDetailsList=[];
    ContactDetailsList.push(this.clientContactList);
    let jsonData = {
     
      subVendorContactDetailsList :ContactDetailsList,
      subVendorDetails:{
        addressOne:this.clientDetails.addressOne,
        addressTwo:this.clientDetails.addressTwo,
        blackListReason:this.clientDetails.blackListReason,
        city:this.clientDetails.city,
        contactNumber:this.clientDetails.contactNumber,
        country:this.clientDetails.country,
        division:this.clientDetails.division,
        faxNumber:this.clientDetails.faxNumber,
        federalId:this.clientDetails.federalId,
        id:this.vId,
        isBlackListed:this.clientDetails.isBlackListed,
        notes:this.clientDetails.notes,
        state:this.clientDetails.state,
        status:this.clientDetails.status,
        subVendorName:this.clientDetails.subVendorName,
        websiteUrl:this.clientDetails.websiteUrl,
        zipCode:this.clientDetails.zipCode
      }
      
       
      
    }
    
  
    loading.present();   
      this.restProvider.updateSubVendor(this.token,jsonData)
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
