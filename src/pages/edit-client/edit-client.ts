import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the EditClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html',
})
export class EditClientPage {
  token:string;
  cId:string;
  reqId:string;
  workflowId:string;
  loginUser:any;
  details:any;
  CId:string;
  clientDetails:any={};
  clientContactList:any;
  industry:any;
  engagement:any;
  addressOne:any;
  addressTwo:string;
  userObj:any[] = [];
  userObj2:any;
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
      this.CId=navParams.get('CId');  
      this.workflowId=navParams.get('workflowId'); 
      console.log('this.vendorId',this.CId);
      this.editClient();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubvendorPage');
  }

  editClient(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   
      loading.present().then(()=>{
      this.restProvider.clientDetailAndContact(this.token,this.CId)     
      .then((data:any)=>{
      this.details = data;
      this.clientDetails =this.details.clientDetails;
      this.clientContactList = this.details.clientContactList;
        
      Object.keys(this.clientContactList).forEach(key=> {
        this.clientContactList[key].addressOne = this.clientDetails.addressOne;
        this.clientContactList[key].addressTwo = this.clientDetails.addressTwo;
     });

   
        loading.dismiss();
        console.log("this.details",this.details);
        console.log("this.clientDetails",this.clientDetails.addressOne);
        console.log("this.clientContactList",this.clientContactList);

       //this.util.showToast("Successfully Submitted.","SUCCESS");
      },errrr=>{
        loading.dismiss();
        //this.util.showToast("Something went wrong.","ERROR");
      });

      this.restProvider.industry(this.token)     
      .then((data:any)=>{
      this.industry = data;
      console.log("this.industry",this.industry);
      },errrr=>{
        loading.dismiss();
        
      });

      this.restProvider.engagement(this.token)     
      .then((data:any)=>{
      this.engagement = data;
      console.log("this.engagement",this.engagement);
      },errrr=>{
        loading.dismiss();
        
      });
      
    });

    
  }

  goBack(){
    this.viewCtrl.dismiss();
  }

  updateClient(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    let ContactDetailsList=[];
    ContactDetailsList.push({'addressOne':this.clientDetails.addressOne},this.clientContactList);
    console.log("ready",ContactDetailsList);
  
    let jsonData = {
      clientContactsList :this.clientContactList,
      clientDetails:{
        addressOne:this.clientDetails.addressOne,
        addressTwo:this.clientDetails.addressTwo,
        blackListReason:this.clientDetails.blackListReason,
        city:this.clientDetails.city,
        contactNumber:this.clientDetails.contactNumber,
        country:this.clientDetails.country,
        division:this.clientDetails.division,
        faxNumber:this.clientDetails.faxNumber,
        federalId:this.clientDetails.federalId,
        isBlackListed:this.clientDetails.isBlackListed,
        notes:this.clientDetails.notes,
        state:this.clientDetails.state,
        status:this.clientDetails.status,
        subVendorName:this.clientDetails.subVendorName,
        websiteUrl:this.clientDetails.websiteUrl,
        zipCode:this.clientDetails.zipCode
      },
      clientId: this.CId,
      jwtUserDetails:{
        emailId:this.loginUser.emailId,
        firstName:this.loginUser.firstName,
        id:this.loginUser.id,
        lastName:this.loginUser.lastName,
        role:this.loginUser.role,
        userName:this.loginUser.userName
      },
      userList:this.clientContactList
    }
    
  
    loading.present();   
      this.restProvider.updateClient(this.token,jsonData)
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
