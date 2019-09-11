import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the TechnicalScreenerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-technical-screener-details',
  templateUrl: 'technical-screener-details.html',
})
export class TechnicalScreenerDetailsPage {
  rolls:any;
  morData:any;
  vosData:any;
  newUser:any;
  objRole:string;
  objReportingMgrOfRec:string;
  objReportingVpOfSales:string;
  first_name:string;
  last_name :string;
  user_name :string;
  email:string;
  contact:string;
  ratings:string;
  addressone:string;
  addresstwo:string;
  altcontact:string;
  city:string;
  country:string;
  range:string;
  reportmgrofrecid:string;
  reportmgrofrecname:string;
  reportvpofsalesid:string;
  state:string;
  zipcode:string;

  
  // skill_name:string;
  // months:string;
  // years:string;
  loginUser:any;
  
  skillArray:Array<Object> = [];
  //private skillArray: Array<any> = [];
   private newAttribute: any = {};
 


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util: UtilsProvider,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider) {
      this.skillArray.push(
        {
          'types':'',
      'skillname':'',
      'years':'',
      'months':''
        }
      );
      let token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.getRoles(token);
      this.managerOfRecruiting(token);
      this.vpOfSales(token);

      
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUserPage');
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
  managerOfRecruiting(token){
    this.restProvider.managerOfRecruiting(0,token)
    .then((res:any)=>{
        this.morData = res;
    },err=>{
      console.log(err);
    });
  }
  vpOfSales(token){
    this.restProvider.vpOfSales(0,token)
    .then((res:any)=>{
      this.vosData = res;
    },err=>{
       console.log(err);
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

  submit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if(this.objRole == undefined || this.objRole == ""){
      this.util.showToast("Please select Roles.","ERROR");
      return;
    }

    if(this.first_name == undefined || this.first_name == "" ){
      this.util.showToast("Please enter First Name.","ERROR");
      return;
    }
    if(!this.util.nameValidate(this.first_name) ){
      this.util.showToast("Name should be characters only","ERROR");
      return;
    }

    if(this.last_name == undefined || this.last_name == ""){
      this.util.showToast("Please enter Last Name.","ERROR");
      return;
    }
    if(!this.util.nameValidate(this.last_name) ){
      this.util.showToast("Name should be characters only","ERROR");
      return;
    }

    if(this.user_name == undefined || this.user_name == ""){
      this.util.showToast("Please enter User Name.","ERROR");
      return;
    }

    if(this.email == undefined || this.email == "" ){
      this.util.showToast("Please enter  Email Id.","ERROR");
      return;
      
    }
    if(!this.util.emailValidate(this.email)){
      this.util.showToast("Please enter valid Email Id.","ERROR");
      return;
    }
    if(this.contact == undefined || this.contact == "" ){
      this.util.showToast("Please enter  Contact.","ERROR");
      return;
      
    }
    if(!this.util.contactValidate(this.contact)){
      this.util.showToast("Please enter Correct Number.","ERROR");
      return;
    }

    if(this.objRole == 'AccountManager'){

      if(this.objReportingVpOfSales == undefined || this.objReportingVpOfSales == ""){
        this.util.showToast("Please select Reporting VP of Sales","ERROR");
        return;
     }

      if(this.objReportingMgrOfRec == undefined || this.objReportingMgrOfRec == ""){
        this.util.showToast("Please select Reporting Mgr. of Recruiting","ERROR");
        return;
      }
      if(this.ratings == undefined || this.ratings == "" ){
        this.util.showToast("Please enter  Ratings.","ERROR");
        return;
        
      }
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
      technicalScreenerSkills: {
        primaryskills: ptypes,
        secondaryskills: stypes
      },

      user :{
        'role':this.objRole,
        'firstName':this.first_name,
        'lastName':this.last_name,
        'userName':this.user_name,
        'emailId':this.email,
        'contactNumber':this.contact,
        'reportingVpOfSalesName':this.objReportingVpOfSales,
        'reportingMgrOfRecName':this.objReportingMgrOfRec,   
        'reportingMgrOfRecID': this.reportmgrofrecid,
        'reportingVpOfSalesID': this.reportvpofsalesid,
        'expectedPayRange': this.range,

        'alternateContact': this.altcontact,
        'addressOne': this.addressone,
        'addressTwo': this.addresstwo,
        'city': this.city,
        'country':this.country,
        'state': this.state,
        'zipCode': this.zipcode
      },
      userJwtBean: {
        emailId: this.loginUser.emailId,
        firstName: this.loginUser.firstName,
        id: this.loginUser.id,
        lastName: this.loginUser.lastName,
        role: this.loginUser.role,
        userName: this.loginUser.userName,
      }
      
       
      
    }
    let token = this.util.getToken(); 
    loading.present();   
      this.restProvider.submitUsers(jsonData,token)
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

