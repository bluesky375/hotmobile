import { Component } from '@angular/core';
import {App, IonicPage,AlertController,ViewController, NavController, NavParams,LoadingController,PopoverController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { TechScreenerPage }  from '../../pages/tech-screener/tech-screener';
import { VpSalesPage }  from '../../pages/vp-sales/vp-sales';
import { AccManagerPage }  from '../../pages/acc-manager/acc-manager';
import { MgrRecruitingPage }  from '../../pages/mgr-recruiting/mgr-recruiting';
import { RecruiterPage }  from '../../pages/recruiter/recruiter';
import { ResourceModalPage }  from '../../pages/resource-modal/resource-modal';
import { CsmPage }  from '../../pages/csm/csm';


/**
 * Generated class for the AddResourcePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-resource',
  templateUrl: 'add-resource.html',
})
export class AddResourcePage {
  token:string;
  loginUser:any;
  reqId:any;
  workflowId:string;
 
  jobTitle:string;
 
  recId:any;
  requirement:any;
  roles_details:any;
  display_result:any;
  userJwtBean:any;
  edit_result:any;
  lead_details:any;
  reqResourcesAddedList:Array<any>=[];
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public util: UtilsProvider,
    public popoverCtrl: PopoverController,
    public loadingCtrl: LoadingController,
    public restProvider: RestProvider,
    public appCtrl: App,
    public modalCtrl:ModalController,
    public viewCtrl : ViewController,
    public alertCtrl: AlertController) {
      this.reqId = navParams.get('reqId');
      this.workflowId = navParams.get('workflowId');
      this.jobTitle =navParams.get('jobTitle');
      
      this.token = this.util.getToken();
      this.loginUser = this.util.getSessionUser();



      this.getRoles();
      this.getAssoicatedUsers();
      this.requirementResource();
      this.reqTimeLapse();
        this.userJwtBean={
          emailId:this.loginUser.emailId,
          firstName: this.loginUser.firstName,
          id:this.loginUser.id,
          lastName:this.loginUser.lastName,
          role:this.loginUser.role,
          userName:this.loginUser.userName
        }
       
      

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddResourcePage');
  }
  getRoles(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.getRoles(this.token)
    .then((data:any) => {
       this.roles_details = data;
        loading.dismiss();
   
    
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
  }
  getAssoicatedUsers(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.getAssoicatedUsers(this.token,this.reqId)
    .then((data:any) => {
     this.display_result = data;  
        console.log('display_result',this.display_result);

        loading.dismiss();
      Object.keys(this.display_result).forEach(key=> {  
         this.reqResourcesAddedList.push(this.display_result[key].dgRoleName);  
         
       });
       console.log('tempArray2',this.reqResourcesAddedList);
    
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
  }

  reqTimeLapse(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.reqTimeLapse(this.token,this.reqId)
    .then((data:any) => {
       
        loading.dismiss();
   
    
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
  }

  goAddResource(){
    let chooseModal = this.modalCtrl.create(AccManagerPage,{reqId:this.reqId,roles_details:this.roles_details});
          chooseModal.present();
  }
  goTechScreener(){
        let chooseModal = this.modalCtrl.create(TechScreenerPage,{reqId:this.reqId,roles_details:this.roles_details});  
        chooseModal.present();    
      } 
  goVpSales(){
    let chooseModal = this.modalCtrl.create(VpSalesPage,{reqId:this.reqId,roles_details:this.roles_details});
    
      chooseModal.present();
  }
    
  goMgrRec(){
    let chooseModal = this.modalCtrl.create(MgrRecruitingPage,{reqId:this.reqId,roles_details:this.roles_details});
      chooseModal.present();
  }
  goRecruiter(){
    let chooseModal = this.modalCtrl.create(RecruiterPage,{reqId:this.reqId,roles_details:this.roles_details});
  
      chooseModal.present();
  }
  goCSM(){
    let chooseModal = this.modalCtrl.create(CsmPage,{reqId:this.reqId,roles_details:this.roles_details});
    chooseModal.present();
  }

deleteResource(res){
  console.log('res',res);
 

    let confirm = this.alertCtrl.create({
      title: 'Delete question',
      message: 'Are you sure you want to delete '+ res.firstName + ' from ' +  this.jobTitle +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
           
            this.restProvider.updateuserStatusToReq(this.reqId,res.userId,res.userName,{},this.token)
                            .then(data => {
                           
                            },error => {
                           
                              this.util.showToast("Something went wrong.","ERROR");
                            })
            
            if(res.dgRoleName == 'CSM'){
              let jsonData = {
                            'csmId': res.userId,
                            'requirementId': this.reqId,
                            userJwtBean:this.userJwtBean
                            }
                
                            
                            this.restProvider.deleteCSM(jsonData,this.token)
                            .then(data => {
                             
                             loading.dismiss();
                              this.util.showToast("Technical Screener Deleted sucessfuly","SUCCESS");
                             
                            },error => {
                             loading.dismiss();
                              this.util.showToast("Something went wrong.","ERROR");
                            })
            }
            if(res.dgRoleName == 'TechnicalScreener'){
              let jsonData = {
                            'recId': res.userId,
                            'requirementId': this.reqId,
                            'screenerId': 0,
                            'user': this.loginUser
                            }
                            jsonData.user.groupsSet=[];
                            jsonData.user.technicalScreenerDetailsSkillsSet=[];
                
                          
                            this.restProvider.deletetechscreener(jsonData,this.token)
                            .then(data => {
                              
                              loading.dismiss();
                
                              this.util.showToast("Technical Screener Deleted sucessfuly","SUCCESS");
                             
                            },error => {
                                  loading.dismiss();
                                  this.util.showToast("Something went wrong.","ERROR");
                                })

                        
            }
            if(res.dgRoleName == 'AccountManager'){
              let jsonData = {
             
                          'actMgrId': res.userId,
                          'requirementId': this.reqId,
                            userJwtBean:this.userJwtBean
                          }
                          
                         
                          this.restProvider.deleteAccountManager(jsonData,this.token)
                          .then(data => {

                            loading.dismiss();
                            this.util.showToast("Account Manager Deleted sucessfuly","SUCCESS");
                           
                          },error => {
                            loading.dismiss();
                            this.util.showToast("Something went wrong.","ERROR");
                          })
            }
            if(res.dgRoleName == 'ManagerOfRecruiting'){
              let jsonData = {
                            'mgrId': res.userId,
                            'requirementId': this.reqId,
                            
                            userJwtBean:this.userJwtBean
                            }
                         
                            this.restProvider.deleteManagerOfRecruiting(jsonData,this.token)
                            .then(data => {
                       
                              loading.dismiss();
                              this.util.showToast("Manager Of Recruiting Deleted sucessfuly","SUCCESS");
                             
                            },error => {
                              loading.dismiss();
                              this.util.showToast("Something went wrong.","ERROR");
                            })
            }
            if(res.dgRoleName == 'Recruiter'){
                 let jsonData = {
                'recId': res.userId,
                'requirementId': this.reqId,
                'screenerId': 0,
                'user':this.loginUser
              
                }
                jsonData.user.groupsSet = [];
                jsonData.user.technicalScreenerDetailsSkillsSet = [];

                this.restProvider.deleterecruiter(jsonData,this.token)
                .then(data => {
                  loading.dismiss();
                  
                  this.util.showToast("Recruiters Deleted sucessfuly","SUCCESS");
                
                },error => {
                  loading.dismiss();
                  this.util.showToast("Something went wrong.","ERROR");
                })
            }
            if(res.dgRoleName == 'VpOfSales'){
              let jsonData = {
           
                            'requirementId': this.reqId,
                            'vpId': res.userId,
                            userJwtBean:this.userJwtBean
                            }
                           
                
                            this.restProvider.deleteVpOfSales(jsonData,this.token)
                            .then(data => {
                              loading.dismiss();
                              this.util.showToast("Vp Of Sales Deleted sucessfuly","SUCCESS");
                             
                            },error => {
                              loading.dismiss();
                              this.util.showToast("Something went wrong.","ERROR");
                            })
            }
         
            let jsonData2 ={
              'activity': "Remove" +res.dgRoleName,
              'jobTitle': this.jobTitle,
              'requirementId': this.reqId,
              'status': "removed" +res.dgRoleName+ "from",
              userJwtBean:this.userJwtBean
            }
          this.restProvider.logsforUsers(jsonData2,this.token)
          .then(data => {
            
            this.getRoles();
            this.getAssoicatedUsers();
            this.requirementResource();
            this.reqTimeLapse();
            loading.dismiss();
          },error => {
            loading.dismiss();
            this.util.showToast("Something went wrong.","ERROR");
          })

          }
        }
      ]
    });
    confirm.present();
  }


  goBack(){
    this.viewCtrl.dismiss();
  }
  requirementResource(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();
    this.restProvider.requirementResource(this.token,this.reqId)
    .then((data:any) => {
        this.requirement = data[0];
        loading.dismiss();
      console.log(" this.requirement", this.requirement)
    },error => {
        
        loading.dismiss();
       // console.log(error);
    });
  } 

 editResource(userId){
   console.log("id",userId)
   
    let chooseModal = this.modalCtrl.create(ResourceModalPage,{userId:userId});  
        chooseModal.present();
  }

  changeLead(res){
    let confirm = this.alertCtrl.create({
      title: 'Add Lead '+res.dgRoleName,
      message: 'Are you sure you want to make  '+ res.firstName + ' as Lead  '+res.dgRoleName+' for the requirement: ' +  this.jobTitle +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
           this.restProvider.leadStatusToReq(this.reqId,res.userId,{},this.token)
           .then(data => {
             this.lead_details = data;
            console.log("lead_details",this.lead_details)

            this.getRoles();
            this.getAssoicatedUsers();
            this.requirementResource();
            this.reqTimeLapse();
            
             loading.dismiss();
             
             this.util.showToast("Lead added sucessfuly","SUCCESS");
           
           },error => {
             loading.dismiss();
             this.util.showToast("Something went wrong.","ERROR");
           })
          }
        }
      ]
    });
    confirm.present();
  }
  removeLead(res){
    let confirm = this.alertCtrl.create({
      title: 'Remove Lead '+res.dgRoleName,
      message: 'Are you sure you want to remove  '+ res.firstName + ' as Lead  '+res.dgRoleName+' for the requirement: ' +  this.jobTitle +'?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please wait...'
            });
           this.restProvider.deleteleadFromReq(this.reqId,res.userId,this.token)
           .then(data => {
             this.lead_details = data;
          console.log("lead_details",this.lead_details)

            this.getRoles();
            this.getAssoicatedUsers();
            this.requirementResource();
            this.reqTimeLapse();
            
             loading.dismiss();
             
             this.util.showToast("Lead added sucessfuly","SUCCESS");
           
           },error => {
             loading.dismiss();
             this.util.showToast("Something went wrong.","ERROR");
           })
          }
        }
      ]
    });
    confirm.present();
  }
}
