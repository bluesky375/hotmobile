import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the EditcandidatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcandidate',
  templateUrl: 'editcandidate.html',
})
export class EditcandidatePage {
  token:string;
  cId:string;
  reqId:string;
  workflowId:string;
  loginUser:any;
  details:any;
  candidate:string;
  detailsId:string;
  firstName:string;
  lastName:string;
  emailId:string;
  cellPhoneNumber:string;
  homePhoneNumber:any;
  skillArray:any;
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
     
     this.editCandidateById();
     this.editCandidate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditcandidatePage');
  }

  addskillValue() {
    this.skillArray.push({
      'skillType':'',
      'skills':'',
      'years':'',
      'months':''
    });
}

deleteskillValue() {
  if( this.skillArray.length > 1){
    this.skillArray.pop();
  }
    
}

  editCandidateById(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   
    loading.present().then(()=>{
        this.restProvider.editCandidateById(this.token,this.cId,this.reqId)
        .then((data:any)=>{
          this.candidate = data;
          this.details = this.candidate['Candidate Details'];
          this.firstName =  this.details.firstName;
          this.lastName = this.details.lastName;
          this.emailId = this.details.emailId;
          this.cellPhoneNumber =this.details.cellPhoneNumber;
          this.homePhoneNumber =this.details.homePhoneNumber;
          this.jobTitle = this.details.jobTitle;
          this.currentEmployer = this.details.currentEmployer;
          this.availability = this.details.availability;
          this.currentLocation = this.details.currentLocation;
          this.immigrationStatus = this.details.immigrationStatus;
          this.totalExperienceYear = this.details.totalExperienceYear;
          this.usExperienceMonth = this.details.usExperienceMonth;
          this.usExperienceYear = this.details.usExperienceYear;
          this.totalExperienceMonth = this.details.totalExperienceMonth;
          this.payRate = this.details.payRate;
          this.billRate = this.details.billRate;
          this.payType = this.details.payType;
          this.payRateCurrency = this.details.payRateCurrency;
          this.billRateCurrency = this.details.billRateCurrency;
          this.division = this.details.division;
          this.address = this.details.address;
          this.address2 = this.details.address2;
          this.zipCode = this.details.zipCode;
          this.city = this.details.city;
          this.state = this.details.state;
          this.country = this.details.country;
          this.note = this.details.note;
       
          this.skillArray =  this.details.candidateSkillsSet;
          console.log( this.skillArray);
          loading.dismiss();
         // this.util.showToast("Successfully Submitted.","SUCCESS");
        },errrr=>{
          loading.dismiss();
         // this.util.showToast("Something went wrong.","ERROR");
        });
    });
  }

  editCandidate(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   
      loading.present().then(()=>{
      this.restProvider.editCandidate(this.token,this.reqId)     
      .then((data:any)=>{
        this.detailsId = data;
        loading.dismiss();
        console.log()
      //  this.util.showToast("Successfully Submitted.","SUCCESS");
      },errrr=>{
        loading.dismiss();
        //this.util.showToast("Something went wrong.","ERROR");
      });
    });
  }

  isReadonly() {
    return this.isReadonly;   //return true/false 
  }

  goBack(){
    this.navCtrl.pop();
  }

  updateCandidate(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    
    let ptypes = [];
    let stypes = [];
    Object.keys(this.skillArray).forEach(key=> {
        if(this.skillArray[key].skillType == "PrimarySkill"){
          ptypes.push(this.skillArray[key]);
        }else{
          stypes.push(this.skillArray[key]);
        }
    });
  
    let jsonData = {
     
      candidates :{
        address: this.address,
        address2: this.address2,
        availability:  this.availability,
        billRate:  this.billRate,
        billRateCurrency:  this.billRateCurrency,
        candidateId:  this.details.candidateId,
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
      defaultResume:  [],
      positionId:  this.reqId,
      resumeId:  [],
    
    user :{
      contactNumber: this.loginUser.contactNumber,
      emailId: this.loginUser.emailId,
      enabled: true,
      errorMessage: null,
      firstName: this.loginUser.firstName,
      groupsSet: [],
      groupsSet_id: this.loginUser.id,
      id:this.loginUser.id,
      imageUrl: this.loginUser.imageUrl,
      lastName: this.loginUser.lastName,
      online: false,
      password: this.loginUser.password,
      role: this.loginUser.role,  
      userName: this.loginUser.userName
      },
      
       
      
    }
    console.log(jsonData);
  
    loading.present();   
      this.restProvider.updateCandidate(jsonData,this.token)
        .then(data => {
          this.util.saveSessionUser(data);
          loading.dismiss();
          this.util.showToast("Successfully Submitted.","SUCCESS");
          
        },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });

        this.restProvider.saveCandidateResume(this.token,this.cId)
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
