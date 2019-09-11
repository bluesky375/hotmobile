import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ViewController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the CreateCandidatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-candidate',
  templateUrl: 'create-candidate.html',
})
export class CreateCandidatePage {
  candidate:any;
  submissionType:string;
  firstName:string;
  lastName:string;
  emailId:string;
  cellPhoneNumber:string;
  homePhoneNumber:any;
 
  jobTitle:string;
  currentEmployer:string;
  availability:string;
  currentLocation:string;
  division:string;
  immigrationStatus:string;
  totalExperienceMonth:string;
  totalExperienceYear:string;
  usExperienceYear:string;
  usExperienceMonth:string;
  payRate:string;
  billRate:string;
  payType:any;
  address:string;
  address2:string;
  zipCode:string;
  city:string;
  state:string;
  country:string;
  payRateCurrency:string;
  billRateCurrency:string;
  note:string;
  
  loginUser:any;
  token:string;
  skillArray:Array<Object> = [];
  reqId:string;
  workflowId:string;
  actMgrId:string;
  details: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController,) {
      this.reqId = navParams.get('reqId');
      this.workflowId = navParams.get('workflowId');
      this.actMgrId = navParams.get('actMgrId');
      
      this.skillArray.push(
        {
          'types':'',
      'skillname':'',
      'years':'',
      'months':''
        }
      );
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.getReqId();
      console.log("lkkkkkkkkkkk", this.getReqId);
      this.getactMgrId();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateCandidatePage');
    
  }

  getReqId(){
    this.restProvider.editCandidate(this.token,this.reqId)
    .then((res:any)=>{
      this.candidate = res;
    
    },errrr=>{
    });
  }
  
  getactMgrId(){
    this.restProvider.editUsers(this.actMgrId,this.token)
    .then((res:any)=>{
      this.details = res;
    },errrr=>{
    });
  }

  addskillValue() {
    this.skillArray.push({
      'types':'',
      'skillname':'',
      'years':'',
      'months':''
    });
}

deleteskillValue() {
  if( this.skillArray.length > 1){
    this.skillArray.pop();
  }
    
}

  submitDetails(){

  
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  if(this.submissionType == undefined || this.submissionType == "" ){
    this.util.showToast("Please select interview types .","ERROR");
    return;
  }

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

  if(this.emailId == undefined || this.emailId == "" ){
    this.util.showToast("Please enter  Email Id.","ERROR");
    return;
    
  }
  if(!this.util.emailValidate(this.emailId)){
    this.util.showToast("Please enter valid Email Id.","ERROR");
    return;
  }
  if(this.cellPhoneNumber == undefined || this.cellPhoneNumber == "" ){
    this.util.showToast("Please enter  Contact.","ERROR");
    return;
    
  }
  if(!this.util.contactValidate(this.cellPhoneNumber)){
    this.util.showToast("Please enter Correct Number.","ERROR");
    return;
  }
  

    if(this.jobTitle == undefined || this.jobTitle == ""){
      this.util.showToast("Please enter jobTitle","ERROR");
      return;
   }

    if(this.currentEmployer == undefined || this.currentEmployer == ""){
      this.util.showToast("Please enter currentEmployer","ERROR");
      return;
    }
    if(this.availability == undefined || this.availability == "" ){
      this.util.showToast("Please select availability.","ERROR");
      return;
      
    }
    if(this.currentLocation == undefined || this.currentLocation == "" ){
      this.util.showToast("Please enter currentLocation.","ERROR");
      return;
      
    }
    if(this.totalExperienceYear == undefined || this.totalExperienceYear == "" ){
      this.util.showToast("Please select totalExperienceYear.","ERROR");
      return;
      
    }
    if(this.totalExperienceYear == undefined || this.totalExperienceYear == "" ){
      this.util.showToast("Please select totalExperienceYear.","ERROR");
      return;
      
    }
    if(this.payRate == undefined || this.payRate == "" ){
      this.util.showToast("Please select totalExperienceYear.","ERROR");
      return;
      
    }
  
  let ptypes = [];
  let stypes = [];
  Object.keys(this.skillArray).forEach(key=> {
      if(this.skillArray[key].types == "PrimarySkill"){
        ptypes.push(this.skillArray[key]);
      }else{
        stypes.push(this.skillArray[key]);
      }
  });
  

  let jsonData = {
     
    candidates :{
      submissionType:this.submissionType,
      address: this.address,
      address2: this.address2,
      availability:  this.availability,
      billRate:  this.billRate,
      billRateCurrency:  this.billRateCurrency,
      candidateResumeId:  this.candidate.candidateResumeId,
      candidateName:  this.firstName + this.lastName,
      candidateSkills: {
        primaryskills: ptypes,
        secondaryskills: stypes
      },
      cellPhoneNumber:  this.cellPhoneNumber,
      city:  this.city,
      country:  this.country,
      lastName:  this.lastName,
      currentEmployer:  this.currentEmployer,
      currentLocation:  this.currentLocation,
      division:  this.division,
      emailId:  this.emailId,
      firstName:  this.firstName,
      homePhoneNumber:  this.homePhoneNumber,
      immigrationStatus:  this.immigrationStatus,
      jobTitle:  this.jobTitle,
      note:this.note,
      linkCount:  0,
      payRate:  this.payRate,
      payRateCurrency:  this.payRateCurrency,
      payType:  this.payType,
      state:  this.state,
      subVendorId:  this.details.subVendorId,
      totalExperienceMonth:  this.totalExperienceMonth,
      totalExperienceYear:  this.totalExperienceYear,
      usExperienceMonth:  this.usExperienceMonth,
      usExperienceYear:  this.usExperienceYear,
      vendorContactList:  this.details.vendorContactList,
      zipCode:  this.zipCode,
      
      
    },
    defaultResume:  ["true"],
     
      positionId: this.reqId,
  
    resumeId:  [1103],
  
  user :this.loginUser,
  
  }
  jsonData.user.groupsSet = [];
  jsonData.user.technicalScreenerDetailsSkillsSet = [];
  loading.present();   
    this.restProvider.submitCandidate(jsonData,this.token)
      .then(data => {
        loading.dismiss();
        this.util.showToast("Successfully Submitted.","SUCCESS");
        
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
