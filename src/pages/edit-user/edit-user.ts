import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the EditUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'edituser',
  segment: 'edituser/userId'
})
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {
  user :any = {};
  userId:string;
  name:string;
  morData:any;
  vosData:any;
  rolls:any;
  skillArray:Array<Object> = [];
 
  loginUser:any;
  token:any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public util:UtilsProvider,
    public restProvider :RestProvider ) {
     
     this.token = this.util.getToken();
     this.userId = navParams.get('userId');
     this.getRoles(this.token);
     this.getUserById(this.userId,this.token);
     this.managerOfRecruiting(this.token);  
     this.vpOfSales(this.token);
     this.addskillValue();
     this.loginUser = this.util.getSessionUser();
     console.log("this.loginUser",this.loginUser);
     this.skillArray.push({
      'skillType':'',
      'skills':'',
      'years':'',
      'months':''
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  goBack(){
    this.navCtrl.pop();
  }

  getRoles(token){
    this.restProvider.groupName(token)
    .then((res:any)=>{
      this.rolls = res;
    },errrr=>{
    });
  }

    
  getUserById(id,token){
    this.restProvider.editUsers(id,token)
    .then(data => {
      this.user = data;
      this.skillArray = this.user.technicalScreenerDetailsDSkillsSet;
      console.log(this.user);
      
    },error => {
        this.util.showToast("Something went wrong.","ERROR");
       
        console.log(error);
    });

  }
  managerOfRecruiting(token){
    this.restProvider.managerOfRecruiting(0,token)
    .then((res:any)=>{
        this.morData = res;
    },errrr=>{
    });
  }
  vpOfSales(token){
    this.restProvider.vpOfSales(0,token)
    .then((res:any)=>{
      this.vosData = res;
    },errrr=>{
      
    });
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
updateUser(){
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  

  // if(this.firstName == undefined || this.firstName == "" ){
  //   this.util.showToast("Please enter First Name.","ERROR");
  //   return;
  // }
  // if(!this.util.nameValidate(this.firstName) ){
  //   this.util.showToast("Name should be characters only","ERROR");
  //   return;
  // }

  // if(this.lastName == undefined || this.lastName == ""){
  //   this.util.showToast("Please enter Last Name.","ERROR");
  //   return;
  // }
  // if(!this.util.nameValidate(this.lastName) ){
  //   this.util.showToast("Name should be characters only","ERROR");
  //   return;
  // }

  // if(this.userName == undefined || this.userName == ""){
  //   this.util.showToast("Please enter User Name.","ERROR");
  //   return;
  // }

  // if(this.emailId == undefined || this.emailId == "" ){
  //   this.util.showToast("Please enter  Email Id.","ERROR");
  //   return;
    
  // }
  // if(!this.util.emailValidate(this.emailId)){
  //   this.util.showToast("Please enter valid Email Id.","ERROR");
  //   return;
  // }
  // if(this.contactNumber == undefined || this.contactNumber == "" ){
  //   this.util.showToast("Please enter  Contact.","ERROR");
  //   return;
    
  // }
  // if(!this.util.contactValidate(this.contactNumber)){
  //   this.util.showToast("Please enter Correct Number.","ERROR");
  //   return;
  // }

  // if(this.role == 'AccountManager'){

  //   if(this.objReportingVpOfSales == undefined || this.objReportingVpOfSales == ""){
  //     this.util.showToast("Please select Reporting VP of Sales","ERROR");
  //     return;
  //  }

  //   if(this.objReportingMgrOfRec == undefined || this.objReportingMgrOfRec == ""){
  //     this.util.showToast("Please select Reporting Mgr. of Recruiting","ERROR");
  //     return;
  //   }
  //   if(this.ratings == undefined || this.ratings == "" ){
  //     this.util.showToast("Please enter  Ratings.","ERROR");
  //     return;
      
  //   }
  // }
 
  
  let ptypes = [];
  let stypes = [];
  Object.keys(this.skillArray).forEach(key=> {
      if(this.skillArray[key].type == "PrimarySkill"){
        ptypes.push(this.skillArray[key]);
      }else{
        stypes.push(this.skillArray[key]);
      }
  });

  let jsonData = {
    technicalScreenertypes: {
      primaryskills: ptypes,
      secondaryskills: stypes
    },
    user :{
      addressOne: this.user.addressOne,
      addressTwo:  this.user.addressTwo,
      alternateContact:  this.user.alternateContact,
      city:  this.user.city,
      contactNumber:  this.user.contactNumber,
      country:  this.user.country,
      emailId:  this.user.emailId,
      expectedPayRange:  this.user.expectedPayRange,
      firstName:  this.user.firstName,
      id:  this.user.id,
      lastName:  this.user.lastName,
      reportingMgrOfRecID:  this.user.reportingMgrOfRecID,
      reportingMgrOfRecName:  this.user.reportingMgrOfRecName,
      reportingVpOfSalesID:  this.user.reportingVpOfSalesID,
      reportingVpOfSalesName:  this.user.reportingVpOfSalesName,
      role:  this.user.role,
      state:  this.user.state,
      userName:  this.user.userName,
      zipCode:  this.user.zipCode
    },
    userJwtBean: {
      emailId: this.loginUser.emailId,
      firstName: this.loginUser.firstName,
      id: this.loginUser.id,
      lastName: this.loginUser.lastName,
      role: this.loginUser.role,
      userName: this.loginUser.userName
    }
   
     
    
  }
  console.log(jsonData);

  loading.present();   
    this.restProvider.updateUserById(jsonData,this.token)
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

isReadonly() {
  return this.isReadonly;   //return true/false 
}
}
