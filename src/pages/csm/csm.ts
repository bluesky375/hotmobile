import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ViewController,ModalController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { AddResourcePage }  from '../../pages/add-resource/add-resource';
import { ResourceModalPage }  from '../../pages/resource-modal/resource-modal';
/**
 * Generated class for the CsmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-csm',
  templateUrl: 'csm.html',
})
export class CsmPage {
  token:string;
  loginUser:any = {};
  reqId:string;
  selectedId='';

  roles_details:any;
  selectRole:string;
  filterRole:string;
  tempArray2:Array<any> = [];
  tempArray:Array<any> = [];
  allUser_details:any;
  dgRoleId:string;
  actual_roleID:string;
  actual_role:any;
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
      this.CSMbyId();
    console.log("roles_details",this.roles_details)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CsmPage');
  }
  radioClicked(vpId){   
    this.selectedId=vpId;
    console.log("selectedId",this.selectedId)
    Object.keys(this.allUser_details).forEach(key=> {
      if(this.allUser_details[key].id == this.selectedId){
        this.actual_role = this.allUser_details[key].role;   
      } 
    });
    Object.keys(this.roles_details).forEach(key=> {
      if(this.roles_details[key].groupName == this.actual_role){
        this.actual_roleID = this.roles_details[key].id;
      
      }
    });
  }
  CSMbyId(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.getAlluserReq(this.token,this.reqId)
    .then( res=> {
      this.allUser_details = res;
      Object.keys(this.allUser_details).forEach(key=> {
        if(this.allUser_details[key].role == 'CSM'){
        
         this.tempArray2.push(this.allUser_details[key]);  
        }
     
       });
      loading.dismiss();
     
    },error => {
      loading.dismiss();
    });
  }
  onSelectRole(selectedValue){
    this.tempArray =[];
    this.filterRole = selectedValue;
    console.log("filterRole",this.filterRole)
 
  if(this.filterRole == '1'){
    this.tempArray =this.allUser_details;  
   
  }else{
    Object.keys(this.allUser_details).forEach(key=> {
      if(this.allUser_details[key].role === this.filterRole){
      
       this.tempArray.push(this.allUser_details[key]);  
      
      }
      
   
     });
  }
  
  }
  onSelectChange(selectedValue){
    this.selectRole = selectedValue;
    console.log(' this.selectRole', this.selectRole)
    Object.keys(this.roles_details).forEach(key=> {
      if(this.roles_details[key].groupName == this.selectRole){
        this.dgRoleId =this.roles_details[key].id
     
      }
    })
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
    if(this.selectRole == undefined || this.selectRole == ""){
      this.util.showToast("Please select add as Role","ERROR");
      return;
    } 
    if(this.selectedId == undefined || this.selectedId== ""){
      this.util.showToast("Please select Resource ","ERROR");
      return;
    } 
    

        if(this.selectRole == 'CSM'){
            let jsonData = {
              'csmId':this.selectedId,
              'requirementId': this.reqId,
              'requirementUserStatus' :[
                {
                  'activeUser': "1",
                  'created_by': this.loginUser.userName,
                  'dgRoleId': this.dgRoleId,
                  'reqId': this.reqId,
                  'roleId': this.actual_roleID,
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
              this.restProvider.addCsm(this.token,jsonData)
              .then(data => {
                this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
                this.util.showToast("Successfully Submitted.","SUCCESS");
              
              },error => {
                loading.dismiss();
                this.util.showToast("Something went wrong.","ERROR");
                console.log(error);
            });
        }
        if(this.selectRole == 'ManagerOfRecruiting'){
          let jsonData = {
            'mgrId':this.selectedId,
            'requirementId': this.reqId,
            'requirementUserStatus' :[
              {
                'activeUser': "1",
                'created_by': this.loginUser.userName,
                'dgRoleId': this.dgRoleId,
                'reqId': this.reqId,
                'roleId': this.actual_roleID,
                'updated_by': this.loginUser.firstName,
                'userId': this.selectedId
              }
            ],

              userJwtBean:{
                emailId:this.loginUser.emailId,
                firstName: this.loginUser.firstName,
                id:this.loginUser.id,
                lastName:this.loginUser.lastName,
                role:this.loginUser.role,
                userName:this.loginUser.userName
              }   
          }
          
            this.restProvider.selectmanagerOfRecruiting(jsonData,this.token)
            .then(data => {
              this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
              this.util.showToast("Successfully Submitted.","SUCCESS");
            
            },error => {
              loading.dismiss();
              this.util.showToast("Something went wrong.","ERROR");
              console.log(error);
          });
      }
      if(this.selectRole == 'VpOfSales'){
        let jsonData = {
          
          'requirementId': this.reqId,
          'requirementUserStatus' :[
            {
              'activeUser': "1",
              'created_by': this.loginUser.userName,
              'dgRoleId': this.dgRoleId,
              'reqId': this.reqId,
              'roleId': this.actual_roleID,
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
            } ,
            'vpId':this.selectedId,  
        }
            jsonData.user.groupsSet=[];
            jsonData.user.technicalScreenerDetailsSkillsSet=[];
          this.restProvider.selectvpOfSales(jsonData,this.token)
          .then(data => {
            this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
            this.util.showToast("Successfully Submitted.","SUCCESS");
          
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });
      }   
        
      if(this.selectRole == 'AccountManager'){
      let jsonData = {
        'actMgrId':this.selectedId,
        'requirementId': this.reqId,
        'requirementUserStatus' :[
          {
            'activeUser': "1",
            'created_by': this.loginUser.userName,
            'dgRoleId': this.dgRoleId,
            'reqId': this.reqId,
            'roleId': this.actual_roleID,
            'updated_by': this.loginUser.firstName,
            'userId': this.selectedId
          }
        ],
        
          userJwtBean:{
            emailId:this.loginUser.emailId,
            firstName: this.loginUser.firstName,
            id:this.loginUser.id,
            lastName:this.loginUser.lastName,
            role:this.loginUser.role,
            userName:this.loginUser.userName
          } ,
          
      }
      
        this.restProvider.selectaccountManager(jsonData,this.token)
        .then(data => {
          this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
          this.util.showToast("Successfully Submitted.","SUCCESS");
        
        },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });
    } 
    if(this.selectRole == 'Recruiter'){
      let jsonData = {
        'recruiterIDs':this.tempArray,
        'requirementId': this.reqId,
        'requirementUserStatus' :[
          {
            'activeUser': "1",
            'created_by': this.loginUser.userName,
            'dgRoleId': this.dgRoleId,
            'reqId': this.reqId,
            'roleId': this.actual_roleID,
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
          this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
          this.util.showToast("Successfully Submitted.","SUCCESS");
        
        },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });
      } 
      if(this.selectRole == 'TechnicalScreener'){
        let jsonData = {
          'addGeneralQuestion':'No',
          'bidQuestionApprove':'No',
          'recruiterIDs':this.dgRoleId,
          'requirementId': this.reqId,
          'requirementUserStatus' :[
            {
              'activeUser': "1",
              'created_by': this.loginUser.userName,
              'dgRoleId': this.dgRoleId,
              'reqId': this.reqId,
              'roleId': this.actual_roleID,
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
        
          this.restProvider.selectTechscreener(jsonData,this.token)
          .then(data => {
            this.navCtrl.push(AddResourcePage,{reqId:this.reqId});
            this.util.showToast("Successfully Submitted.","SUCCESS");
          
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });
        } 
    }
}

