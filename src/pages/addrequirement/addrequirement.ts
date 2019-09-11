import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ModalController,ViewController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { ContactmodalPage }  from '../../pages/contactmodal/contactmodal';
import { AddcontactmodalPage }  from '../../pages/addcontactmodal/addcontactmodal';
import { RequirementsPage } from '../../pages/requirements/requirements';

/**
 * Generated class for the AddrequirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addrequirement',
  templateUrl: 'addrequirement.html',
})
export class AddrequirementPage {
  clients:any = {};
  token:string;
  clientname:any;
  loginUser:any;
  id:string;
  Status:string;
  addNoMoreCandidates:string;
  clientId:string;
  clientName:string;
  contactPerson:string;
  contactPersonIds:string;
  duration:string;
  durationPeriod:string;
  isQuestionAdded:string;
  jobTitle:string;
  openPositions:string;
  payRate:string;
  payRateCurrency:string;
  payRatePeriod:string;
  primarySkill:string;
  priority:string;
  readyForInterview:string;
  secondarySkill:string;
  contactdetails:string;
  selectedClient:string;
  clientContactId:string;
  skillArray:Array<Object> = [];
  skill:any;
  billRate:string;
  client_id:string;
  selectedClientId:string
  typeOfReq:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public viewCtrl : ViewController,
    public restProvider: RestProvider,
    public modalCtrl : ModalController) {
      this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
       this.getClients(this.token);
      this.getClientById(this.token,this.loginUser);
     //this.onSelectChange(this.token);
    // this.openClientModal();

      this.skillArray.push(
        {
          'types':'',
          'skillname':'',
     
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrequirementPage');
  }

  
  addskillValue() {
    this.skillArray.push({
      'types':'',
      'skillname':'',
     
    });
}
deleteskillValue() {
  if( this.skillArray.length > 1){
    this.skillArray.pop();
  }
    
}
  getClients(token){
    this.restProvider.randomId(token)
    .then((res:any)=>{
       this.clients = res;
       console.log("clients",this.clients);

    },errrr=>{
    });
  }
  getClientById(token,user){
    this.restProvider.randomClientId(token,user)
    .then((res:any)=>{
      this.clientname = res;
     console.log("clientid",this.clientname);
    },errrr=>{
    });
  }
  onSelectChange(selectedValue) {
    console.log('Selected', selectedValue);
    this.selectedClient = selectedValue;
    this.restProvider.clientNameForRequirement(selectedValue,this.token)
    .then((data:any)=>{
        this.contactdetails = data;
        this.selectedClientId = data[0].client_id; 
       
      console.log("rizwan",this.selectedClientId); 
    },errrr=>{
    });
  }
  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    if(this.clientName == undefined || this.clientName == ""){
      this.util.showToast("Please select client.","ERROR");
      return;
    }
  
    if(this.jobTitle == undefined || this.jobTitle == "" ){
      this.util.showToast("Please enter jobTitle.","ERROR");
      return;
      
    }
   

   
   
      if(this.duration == undefined || this.duration == ""){
        this.util.showToast("Please enter duration","ERROR");
        return;
     }

      if(this.durationPeriod == undefined || this.durationPeriod == ""){
        this.util.showToast("Please select durationPeriod","ERROR");
        return;
      }
      if(this.openPositions == undefined || this.openPositions == ""){
        this.util.showToast("Please enter open Positions","ERROR");
        return;
      }
      if(this.payRate == undefined || this.payRate == ""){
        this.util.showToast("Please select payRate","ERROR");
        return;
      }
      if(this.payRateCurrency == undefined || this.payRateCurrency == ""){
        this.util.showToast("Please select payRateCurrency","ERROR");
        return;
      }
      if(this.payRatePeriod == undefined || this.payRatePeriod == ""){
        this.util.showToast("Please select payRatePeriod","ERROR");
        return;
      }
      if(this.billRate == undefined || this.billRate == ""){
        this.util.showToast("Please select billRate","ERROR");
        return;
      }
    
    let ptypes = '';
    let stypes = '';
    Object.keys(this.skillArray).forEach(key=> {
        if(this.skillArray[key].types == "PrimarySkill"){
          ptypes+=this.skillArray[key].skillname +',';
          
        }else{
          stypes+=this.skillArray[key].skillname +',';
        }

        console.log("this.skillArray[key].types",this.skillArray[key].types);
    });
    console.log("ptypes",ptypes);
    console.log("stype",stypes);
 
    let jsonData = {
      "Status": "Open", 
      "addNoMoreCandidates": "No",
       "billRate":this.billRate,
      "clientId":this.selectedClientId,
      "clientName":this.clientName,
      "contactPerson":"",
      "contactPersonIds":[],
      "duration":this.duration,
      "durationPeriod":this.durationPeriod,
      "isQuestionAdded":"No",
      
      "jobTitle":this.jobTitle,
      "openPositions":this.openPositions,
      "payRate":this.payRate,
      "payRateCurrency":this.payRateCurrency,
      "payRatePeriod":this.payRatePeriod,
      "primarySkill":ptypes,
      "priority":this.priority,
      "readyForInterview":"No",
      "secondarySkill":stypes,
      "typeOfReq":this.typeOfReq,
     
      "user":this.loginUser,


    }
    jsonData.user.groupsSet = [];
    jsonData.user.technicalScreenerDetailsSkillsSet = [];
   
    console.log("json",jsonData);
    loading.present();   
      this.restProvider.submitRequirement(jsonData, this.token)
        .then(data => {
         this.navCtrl.push(RequirementsPage);
          loading.dismiss();
          this.util.showToast("Successfully Submitted.","SUCCESS");
           console.log("data",data); 
           
        },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });
  }

  

  openClientModal(contact){

    // console.log(contact);
    // this.restProvider.contactDetails(contact.id,this.token)
    // .then((data:any)=>{
       
    //   console.log("clientid",data);
    // },errrr=>{
    //   console.log(errrr);
    // });
  let modalPage = this.modalCtrl.create(ContactmodalPage,{'contactid':contact.id,'contact':contact});  
  modalPage.present(); 
 
    }
    addClientModal(contact){
      let addmodalPage = this.modalCtrl.create(AddcontactmodalPage,{'contactid':contact.client_id}); 
      addmodalPage.onDidDismiss((status:string) => {
        if(status == "SUCCESS"){
          this.restProvider.clientNameForRequirement(this.selectedClient,this.token)
          .then((data:any)=>{
              this.contactdetails = data;
            //console.log("data",data);
          },errrr=>{
          });
        }
    }); 
      addmodalPage.present(); 
     
    }

    activateData(id){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      let jsonContact = {
        "clientContactId":id,
        "user":this.loginUser
      }
      jsonContact.user.groupsSet = [];
      loading.present();  
      this.restProvider.updateContact(jsonContact,this.token)     
      .then((data:any)=>{
        loading.dismiss();
        this.util.showToast("Client contact is activated and mail send successfully.","SUCCESS");
      },errrr=>{
        loading.dismiss();
        this.util.showToast("Something went wrong.","ERROR");
      });
    }

    goBack(){
      this.viewCtrl.dismiss();
    }
}
