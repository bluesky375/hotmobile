import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { AddResourcePage }  from '../../pages/add-resource/add-resource';
import { ResourceModalPage }  from '../../pages/resource-modal/resource-modal';

/**
 * Generated class for the RecruiterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recruiter',
  templateUrl: 'recruiter.html',
})
export class RecruiterPage {
  token:string;
  loginUser:any = {};
  recruiter:any;
  reqId:string;
  result:any;
  manager:any;
  sales:any;
  recruiters:any;
  accmanager:any;
  screener:any;
  selectedId='';

  roles_details:any;
  selectRole:string;
  filterRole:string;
  tempArray2:Array<any> = [];
  tempArray:Array<any> = [];
  allUser_details:any;
  arrayID:Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl:LoadingController,
    public util: UtilsProvider,
    public restProvider:RestProvider,
    public viewCtrl : ViewController,
    
    public modalCtrl:ModalController,) {
      this.reqId = navParams.get('reqId');
      this.roles_details = navParams.get('roles_details');
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();
      this.RecruiterById();
  }

  ionViewDidLoad() {
    
  }

  radioClicked(recId){
    
    this.selectedId=recId;
    this.arrayID.push(this.selectedId);
    console.log("selectedId",this.selectedId)
  }

  RecruiterById(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getAlluserReq(this.token,this.reqId)
    .then( res=> {
      this.allUser_details = res;
      Object.keys(this.allUser_details).forEach(key=> {
        if(this.allUser_details[key].role == 'Recruiter'){
        
         this.tempArray2.push(this.allUser_details[key]);  
        }
     
       });
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  goBack(){
    this.viewCtrl.dismiss();
  }

  editUser(id){
    let chooseModal = this.modalCtrl.create(ResourceModalPage,{userId:id});
    console.log("this.userIdccccccccccc",id)
    chooseModal.present(); 
  }
  
  submitData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    // if(this.selectRole == undefined || this.selectRole == ""){
    //   this.util.showToast("Please select add as Role","ERROR");
    //   return;
    // } 
    if(this.selectedId == undefined || this.selectedId== ""){
      this.util.showToast("Please select Resource ","ERROR");
      return;
    } 

    
      let jsonData = {
        'recruiterIDs':this.arrayID,
        'requirementId': this.reqId,
        'requirementUserStatus' :[
          {
            'activeUser': "1",
            'created_by': this.loginUser.userName,
            'dgRoleId': 5,
            'reqId': this.reqId,
            'roleId': 5,
            'updated_by': this.loginUser.firstName,
            'userId': this.selectedId
          }
        ],
        user:this.loginUser,
        userJwtBean:{
          emailId:this.loginUser.emailId,
          firstName: this.loginUser.firstName,
          id:this.loginUser.id,
          lastName:this.loginUser.lastName,
          role:this.loginUser.role,
          userName:this.loginUser.userName
        } 
       
      }
        jsonData.user.groupsSet=[];
        jsonData.user.technicalScreenerDetailsSkillsSet=[];
      
        this.restProvider.selectRecruiter(jsonData,this.token)
        .then(data => {
            this.restProvider.recruiterMail(jsonData,this.token)
            .then(data => {
              
                this.restProvider.detailsForDropdown(this.token)
                .then(data => {
                  
                  this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
                  this.util.showToast("Successfully Submitted.","SUCCESS");
                },error => {
                  
                  loading.dismiss();
                  this.util.showToast("Something went wrong.","ERROR");
                  console.log(error);
               });
            
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
              console.log(error);
            });
                
        },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });
      
    }
  
  
  requirementResource(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.requirementResource(this.token,this.reqId)
    .then((data:any) => {
        this.manager = data[0];
        loading.dismiss();
      console.log(" this.manager", this.manager)
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
  } 
}
