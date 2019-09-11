import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,LoadingController,ModalController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { AddcontactmodalPage }  from '../../pages/addcontactmodal/addcontactmodal';

/**
 * Generated class for the EditrequirementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editrequirements',
  templateUrl: 'editrequirements.html',
})
export class EditrequirementsPage {
  clientdata:any={};
  clientId:string;
  token:string;
  contact:Array<Object> = [];
  clientName:any={};
  loginUser:any;
  client:any;
  priority:string;
  typeOfReq:string;
  skillArray:Array<Object> = [];
  durationPeriod:string;
  payRateCurrency:string;
  payRatePeriod:string;
  primarySkill:any;
  secondarySkill:any;
  selectedClient:String;
  contactdetails:any;
  selectedClientId:string;

  billRate:string;
  billRateCurrency:string;
  billRatePeriod:string;
  broadcastLocation:string;
  clientAddress:string;
  clientAddress2:string;
  clientCity:string;
  clientCountry:string;
  clientLocation:string;
  clientState:string;
  contactPerson:any;
  contactPersonIds:any;
  duration:string;
  jobDescription:string;
  jobTitle:string;
  modeOfInterview:string;
  openPositions:string;
  payRate:string;
  positionId:string;
  positionNotes:string;
  readyForInterview:string;
  startDate:string;
  zipCode:string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util:UtilsProvider,
    public restProvider :RestProvider,
    public viewCtrl : ViewController,
    public loadingCtrl: LoadingController,
    public modalCtrl : ModalController) {
      this.clientId = navParams.get('clientId');
      this.clientName=navParams.get('clientName');
      
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.editRequirementsById(this.clientId,this.token);
      this.clientNameForRequirement(this.clientName);
      this.randomClientId(this.loginUser);
      this.restProvider.randomClientId(this.token, this.loginUser)
    .then((res:any)=>{
      this.client = res;
     // console.log("clientid",this.client);
    },errrr=>{
    }); 
     
  }
    

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditrequirementsPage');
  }

  addskillValue() {
    this.skillArray.push({
      'types':'',
      'skillname':''
    
    });
}

deleteskillValue() {
  if( this.skillArray.length > 1){
    this.skillArray.pop();
  }
    
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
  editRequirementsById(positionId,token){
    
    this.restProvider.editRequirements(positionId,token)
    .then(data => {
      this.clientdata = data;
     
      
      this.priority = this.clientdata.priority;
      this.typeOfReq = this.clientdata.typeOfReq;
      this.primarySkill =  this.clientdata.primarySkill;
      this.secondarySkill =  this.clientdata.secondarySkill;
      let primaryskillname ;
      let secondaryskillname;
      primaryskillname = (this.primarySkill.split(','));
      secondaryskillname = this.secondarySkill.split(",");

     

      Object.keys(primaryskillname).forEach(key=> {
        if(primaryskillname[key] != ""){
          this.skillArray.push({
                'types':'primarySkill',
                'skillname':primaryskillname[key]
          });
        }
       
      });

      Object.keys(secondaryskillname).forEach(key=> {
        if(secondaryskillname[key] != ""){
          this.skillArray.push({
                'types':'secondarySkill',
                'skillname':secondaryskillname[key]
          });
        }
       
      });

     
      console.log('rizwan',this.skillArray);
     
      

      
      this.durationPeriod =this.clientdata.durationPeriod;
     this.skillArray = this.skillArray;
      this.payRateCurrency = this.clientdata.payRateCurrency;
      this.payRatePeriod = this.clientdata.payRatePeriod;
    // console.log("primarySkill",this.primarySkill);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
       
        console.log(error);
    });

  }
  clientNameForRequirement(clientName){
    this.restProvider.clientNameForRequirement(clientName,this.token)
    .then((data:any)=>{
        this.contact = data;
     // console.log("clientName",this.contact);
    },errrr=>{
    });
  }

  randomClientId(user){
    this.restProvider.randomClientId(this.token, user)
    .then((res:any)=>{
      this.client = res;
     // console.log("clientid",this.client);
    },errrr=>{
    });
  }

  goBack(){
    this.viewCtrl.dismiss();
  }
 
  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    
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
  
    let jsonData = {
     
      positions :{
        Status: "open",
        billRate: this.clientdata.billRate,
        billRateCurrency:  this.clientdata.billRateCurrency,
        billRatePeriod:  this.clientdata.billRatePeriod,
        broadcastLocation:  this.clientdata.broadcastLocation,
        clientAddress:  this.clientdata.clientAddress,
        clientAddress2:  this.clientdata.clientAddress2,
       
        clientCity:  this.clientdata.clientCity,
        clientCountry:  this.clientdata.clientCountry,
        clientId:this.selectedClientId,
        clientLocation:  this.clientdata.clientLocation,
        clientName:  this.clientdata.clientName,
        clientState:  this.clientdata.clientState,
        contactPerson:  this.clientdata.contactPerson,
        contactPersonIds:  [],
        duration:  this.clientdata.duration,
        durationPeriod:  this.durationPeriod,
        isQuestionAdded: 'No',
        jobDescription:  this.clientdata.jobDescription,
        modeOfInterview:this.clientdata.modeOfInterview,
        jobTitle:  this.clientdata.jobTitle,
        positionNotes:this.clientdata.positionNotes,
        openPositions:  this.clientdata.openPositions,
        payRate:  this.clientdata.payRate,
        payRateCurrency:  this.payRateCurrency,
        payType:  this.payRatePeriod,
        positionId:  this.clientdata.positionId,
        primarySkill:ptypes,

        priority:  this.priority,
        readyForInterview:  'No',
        secondarySkill:  stypes,
        startDate:  this.clientdata.startDate,
        typeOfReq:  this.typeOfReq,
      
        zipCode:  this.clientdata.zipCode,
        
        
      },
      user :this.loginUser
      
       
      
    }
    jsonData.user.groupsSet=[];
    jsonData.user.technicalScreenerDetailsSkillsSet=[];

    console.log(jsonData);
  
    loading.present();   
      this.restProvider.updateRequirement(jsonData,this.token)
        .then(data => {
          this.util.saveSessionUser(data);
          loading.dismiss();
          this.util.showToast("Successfully Submitted.","SUCCESS");
        },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });

  }
}
