import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
/**
 * Generated class for the CreateClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-client',
  templateUrl: 'create-client.html',
})
export class CreateClientPage {
  token:string;
  cId:string;
  loginUser:any;
  industry:any;
  engagement:any;

  clientName:string;
  engagementModel:string;
  industryModel:string;
  federalId:string;
  contactNumber:string;
  faxNumber:string;
  websiteUrl:string;
  firstName:string;
  lastName:string;
  userName:string;
  emailId:string;
  contactNumber2:string;
  alternateContact:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController) {
      this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
      this.cId=navParams.get('cId');  
      this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateClientPage');
  }
  getData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present().then(()=>{
      
      this.restProvider.industry(this.token)     
      .then((data:any)=>{
      this.industry = data;
      loading.dismiss();
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

  submitClient(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    if(this.clientName == undefined || this.clientName == "" ){
      this.util.showToast("Please enter clientName .","ERROR");
      return;
    }
    if(this.industryModel == undefined || this.industryModel == "" ){
      this.util.showToast("Please select Industry .","ERROR");
      return;
    }
    if(this.engagementModel == undefined || this.engagementModel == "" ){
      this.util.showToast("Please select Engagement Model .","ERROR");
      return;
    }
    if(this.federalId == undefined || this.federalId == "" ){
      this.util.showToast("Please enter federalId.","ERROR");
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
      if(this.userName == undefined || this.userName == "" ){
        this.util.showToast("Please enter Username.","ERROR");
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
      if(this.contactNumber2 == undefined || this.contactNumber2 == "" ){
      this.util.showToast("Please enter  Contact.","ERROR");
      return;
      
    }
    if(!this.util.contactValidate(this.contactNumber2)){
      this.util.showToast("Please enter Correct Number.","ERROR");
      return;
    }
    
    
  
    let jsonData = {
       
      clientContactsList :[{
        alternateContact:this.alternateContact,
        client_id:  this.cId,
        contactFullName:this.firstName + this.lastName,
        contactNumber:this.contactNumber,
        emailId: this.emailId,
        firstName: this.firstName,
        lastName:  this.lastName,
        sendUserEmail:false,
        userName:this.userName
      }],
      clientDetails:{
        clientName:this.clientName,
        contactNumber:this.contactNumber2,
        engagementModel:this.engagementModel,
        engagementModelOther:"",
        faxNumber:this.faxNumber,
        federalId:this.federalId,
        industry:this.industryModel,
        industryOther:"",
        websiteUrl:this.websiteUrl,
        
      },
      jwtUserDetails:{
        emailId:this.loginUser.emailId,
        firstName:this.loginUser.firstName,
        id:this.loginUser.id,
        lastName:this.loginUser.lastName,
        role:this.loginUser.role,
        userName:this.loginUser.userName
      },
      userList:[{
        alternateContact:this.alternateContact,
        client_id:  this.cId,
        contactFullName:this.firstName + this.lastName,
        contactNumber:this.contactNumber,
        emailId: this.emailId,
        firstName: this.firstName,
        lastName:  this.lastName,
        sendUserEmail:false,
        userName:this.userName
      }],
    }
    loading.present();   
      this.restProvider.createclient(this.token,jsonData)
        .then(data => {
          loading.dismiss();
          this.util.showToast("client Successfully Added.","SUCCESS");


          this.restProvider.getClients(this.token,this.loginUser)
        .then( res=> {
          //this.Clientslist = res;
         // console.log('this.Clients',this.Clientslist);
          loading.dismiss();
         
        },error => {
          loading.dismiss();
        });

        },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });

        this.restProvider.clientMail(this.token,jsonData)
        .then(data => {
          loading.dismiss();
          this.util.showToast("Mail Successfully Sent.","SUCCESS");
          
        },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });

        
  }

  goBack(){
    this.viewCtrl.dismiss();
  }
}
