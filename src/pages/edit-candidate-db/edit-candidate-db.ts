import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,LoadingController,PopoverController,ModalController,ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the EditCandidateDbPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-candidate-db',
  templateUrl: 'edit-candidate-db.html',
})
export class EditCandidateDbPage {
  token:string;
  
  canId:string;
  details:any;
  CandidateDetails:any={};
  skillArray:any;
  resume:any={};
  detailsResume:any;

  loginUser:any;
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public viewCtrl : ViewController) {
     this.loginUser = this.util.getSessionUser();
      this.token = this.util.getToken();
      this.canId=navParams.get('canId');  
      this.getBycandidateId();
    console.log('this.canId',this.canId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCandidateSidePage');
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
 getBycandidateId(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
   
      loading.present().then(()=>{
      this.restProvider.editCandidateFromDb(this.token,this.canId)     
      .then((data:any)=>{
      this.details = data;
      this.CandidateDetails = this.details['Candidate Details'];
      this.skillArray =  this.CandidateDetails.candidateSkillsSet;
      this.resume = JSON.parse(this.details.resume);
      this.detailsResume =this.resume.Resume;

        loading.dismiss();
        console.log("this.details",this.details);
        console.log("this.resume",this.resume);
        console.log("this.detailsResume",this.detailsResume);

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
 

  updateCandidate(){
    {
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
          address: this.CandidateDetails.address,
          address2: this.CandidateDetails.address2,
          availability:  this.CandidateDetails.availability,
          billRate:  this.CandidateDetails.billRate,
          billRateCurrency:  this.CandidateDetails.billRateCurrency,
          candidateId:  this.canId,
          candidateName:  this.CandidateDetails.firstName + this.CandidateDetails.lastName,
          candidateSkills: {
            primaryskills: ptypes,
            secondaryskills: stypes
          },
          cellPhoneNumber:  this.CandidateDetails.cellPhoneNumber,
          city:  this.CandidateDetails.city,
          country:  this.CandidateDetails.country,
          lastName:  this.CandidateDetails.lastName,
          currentEmployer:  this.CandidateDetails.currentEmployer,
          currentLocation:  this.CandidateDetails.currentLocation,
          division:  this.CandidateDetails.division,
          emailId:  this.CandidateDetails.emailId,
          firstName:  this.CandidateDetails.firstName,
          homePhoneNumber:  this.CandidateDetails.homePhoneNumber,
          immigrationStatus:  this.CandidateDetails.immigrationStatus,
          jobTitle:  this.CandidateDetails.jobTitle,
          note:this.CandidateDetails.note,
          linkCount:  0,
          payRate:  this.CandidateDetails.payRate,
          payRateCurrency:  this.CandidateDetails.payRateCurrency,
          payType:  this.CandidateDetails.payType,
          state:  this.CandidateDetails.state,
          subVendorId:  this.details.subVendorId,
          totalExperienceMonth:  this.CandidateDetails.totalExperienceMonth,
          totalExperienceYear:  this.CandidateDetails.totalExperienceYear,
          usExperienceMonth:  this.CandidateDetails.usExperienceMonth,
          usExperienceYear:  this.CandidateDetails.usExperienceYear,
          vendorContactList:  this.details.vendorContactList,
          zipCode:  this.CandidateDetails.zipCode,
          
          
        },
        defaultResume:  [],
        positionId:  0,
        resumeId:  [],
      
      user : this.loginUser
     
    }
    jsonData.user.groupsSet=[];
    jsonData.user.technicalScreenerDetailsSkillsSet=[];
    
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
  
          this.restProvider.saveCandidateResume(this.token,this.canId)
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
}
