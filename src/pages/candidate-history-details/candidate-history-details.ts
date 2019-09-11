import { Component } from '@angular/core';
import {App,IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { AddcontactmodalPage }  from '../../pages/addcontactmodal/addcontactmodal';

/**
 * Generated class for the CandidateHistoryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-candidate-history-details',
  templateUrl: 'candidate-history-details.html',
})
export class CandidateHistoryDetailsPage {
  ReqId:string;
  token:string;
  candidate:any={};
  contact:any;
  clientName:any;
  allNames:any;
  loginUser:any;
  contactdetails:string;
  selectedClient:string;
  clientContactId:string;
  selectedClientId:string;

  skillArray:Array<Object> = [];
  skill:any;
  jobTitle:string;
  duration:string;
  durationPeriod:string;
  openPositions:string;
  payRate:string;
  payRateCurrency:string;
  payRatePeriod:string;
  billRate:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider:RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public popoverCtrl: PopoverController ,
    public alertCtrl: AlertController,
    public viewCtrl : ViewController,
    public modalCtrl:ModalController,
    public appCtrl: App,) {
      this.token = this.util.getToken();
      this.ReqId = navParams.get('ReqId');
      this.loginUser = this.util.getSessionUser();
      console.log(' this.ReqId', this.ReqId);
      this.editRequirements();
      this.randomClientId();
     // this.clientNameForRequirement();
      //console.log(' this.editRequirements', this.editRequirements);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CandidateHistoryDetailsPage');
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
  randomClientId(){
    this.restProvider.randomClientId(this.token,this.loginUser)
    .then((res:any)=>{
      this.allNames = res;
      console.log("this.client",this.allNames);
      
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
       
      console.log("rizwan",this.contactdetails); 
    },errrr=>{
    });
  }
  addClientModal(contact){
    let addmodalPage = this.modalCtrl.create(AddcontactmodalPage,{'contactid':contact.client_id}); 
    addmodalPage.onDidDismiss((status:string) => {
      if(status == "SUCCESS"){
        this.restProvider.clientNameForRequirement(this.selectedClient,this.token)
        .then((data:any)=>{
            this.contactdetails = data;
        console.log("contact.client_id",contact.client_id);
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
    this.restProvider.activateContact(jsonContact,this.token)     
    .then((data:any)=>{
      loading.dismiss();
      this.util.showToast("Client contact is activated and mail send successfully.","SUCCESS");
    },errrr=>{
      loading.dismiss();
      this.util.showToast("Something went wrong.","ERROR");
    });
  }
  editRequirements(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   
      loading.present().then(()=>{
      this.restProvider.editRequirements(this.ReqId,this.token)     
      .then((data:any)=>{
        this.candidate = data;
        this.clientName = this.candidate.clientName;
       
       // console.log("this.clientName",this.clientName)
        this.restProvider.clientNameForRequirement(this.clientName,this.token)
        .then((res:any)=>{
          this.contact = res;


          console.log("this.contact",this.contact);
          loading.dismiss();
        },errrr=>{
          loading.dismiss();
        });
       this.util.showToast("Successfully Submitted.","SUCCESS");
      },errrr=>{
        loading.dismiss();
        this.util.showToast("Something went wrong.","ERROR");
      });
     
    });
  }
  goBack(){
   this.viewCtrl.dismiss();
 }

 updateCandidate(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  // if(this.clientName == undefined || this.clientName == ""){
  //   this.util.showToast("Please select client.","ERROR");
  //   return;
  // }

  // if(this.jobTitle == undefined || this.jobTitle == "" ){
  //   this.util.showToast("Please enter jobTitle.","ERROR");
  //   return;
    
  // }
 
  //   if(this.duration == undefined || this.duration == ""){
  //     this.util.showToast("Please enter duration","ERROR");
  //     return;
  //  }

  //   if(this.durationPeriod == undefined || this.durationPeriod == ""){
  //     this.util.showToast("Please select durationPeriod","ERROR");
  //     return;
  //   }
  //   if(this.openPositions == undefined || this.openPositions == ""){
  //     this.util.showToast("Please enter open Positions","ERROR");
  //     return;
  //   }
  //   if(this.payRate == undefined || this.payRate == ""){
  //     this.util.showToast("Please select payRate","ERROR");
  //     return;
  //   }
  //   if(this.payRateCurrency == undefined || this.payRateCurrency == ""){
  //     this.util.showToast("Please select payRateCurrency","ERROR");
  //     return;
  //   }
  //   if(this.payRatePeriod == undefined || this.payRatePeriod == ""){
  //     this.util.showToast("Please select payRatePeriod","ERROR");
  //     return;
  //   }
  //   if(this.billRate == undefined || this.billRate == ""){
  //     this.util.showToast("Please select billRate","ERROR");
  //     return;
  //   }
  
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
    positions:this.candidate,
   
    user:this.loginUser,


  }
  jsonData.user.groupsSet = [];
  jsonData.user.technicalScreenerDetailsSkillsSet = [];
 
  console.log("json",jsonData);
  loading.present();   
    this.restProvider.updateRequirement(jsonData, this.token)
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



}
