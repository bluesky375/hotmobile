import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,PopoverController,ModalController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { UserActionPopoverComponent } from '../../components/user-action-popover/user-action-popover';
import { AddUserPage }  from '../../pages/add-user/add-user';
import { EditUserPage }  from '../../pages/edit-user/edit-user';
import { ModalPage }  from '../../pages/modal/modal';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    name: 'users',
  segment: 'users'
  }
)
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  userObj:any[] = [];
  recruiterScoringSchema:any;
  tsScoringSchema:any;
  scoringDetails:Array<Object> = [];
  edit_id:string;
  user :any = {};
  data:any;
  filterData:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public util: UtilsProvider,
              public popoverCtrl: PopoverController,
              public loadingCtrl: LoadingController,
              public restProvider: RestProvider,
              public modalCtrl:ModalController) {
                let token = this.util.getToken();
                this.user=navParams.get('user');
                this.users(token);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }
 
  presentPopover(mCode,myEvent,user) {
    var data = {
      code : mCode
    };
    let popover = this.popoverCtrl.create(UserActionPopoverComponent,{'user':user,data});
    popover.present({
      ev: myEvent  
    }); 
    console.log("mCode",data); 
  }
 
  openpopUp(){

  }
  users(token){ 
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.restProvider.users(token)
    .then((res:any) => {
      this.recruiterScoringSchema    = res.RecruiterScoringSchema;
      this.tsScoringSchema           = res.TsScoringSchema;
      
      // Object.keys(res.scoringDetails).forEach(key=> {
      //   if(this.scoringDetails[res.scoringDetails[key].userId] == undefined){
      //     this.scoringDetails[res.scoringDetails[key].userId] = res.scoringDetails[key];
      //   }
      // });

      Object.keys(res.userList).forEach(key=> {
        if(res.userList[key].enabled){
          res.userList[key].enabledStatus = "Active";
        }else{
          res.userList[key].enabledStatus = "Inactive";
        }

        res.userList[key].ratingFlag = 'NA';
        // let scoreObj:any = this.scoringDetails[res.userList[key].id];
      //   if(scoreObj != undefined){
      //     if(res.userList[key].role == "TechnicalScreener"){
      //         if(scoreObj.score>=0 && scoreObj.score<=parseInt(this.tsScoringSchema.novice)){
      //           res.userList[key].ratingFlag = "Novice";
      //         }else if(scoreObj.score>=parseInt(this.tsScoringSchema.novice)+1 && scoreObj.score<=parseInt(this.tsScoringSchema.average)){
      //           res.userList[key].ratingFlag = "Average";
      //         }else if(scoreObj.score>=parseInt(this.tsScoringSchema.average)+1 && scoreObj.score<=parseInt(this.tsScoringSchema.good)){
      //           res.userList[key].ratingFlag = "Good";
      //         }else if(scoreObj.score>=parseInt(this.tsScoringSchema.good)+1 && scoreObj.score<=parseInt(this.tsScoringSchema.expert)){
      //           res.userList[key].ratingFlag = "Expert";
      //         }else if(scoreObj.score>=parseInt(this.tsScoringSchema.expert)+1 && scoreObj.score<=parseInt(this.tsScoringSchema.guru)){
      //           res.userList[key].ratingFlag = "Guru";
      //         }

      //     }else if(res.userList[key].role == "Recruiter"){
      //         if(scoreObj.score>=0 && scoreObj.score<=parseInt(this.recruiterScoringSchema.novice)){
      //           res.userList[key].ratingFlag = "Novice";
      //         }else if(scoreObj.score>=parseInt(this.recruiterScoringSchema.novice)+1 && scoreObj.score<=parseInt(this.recruiterScoringSchema.average)){
      //           res.userList[key].ratingFlag = "Average";
      //         }else if(scoreObj.score>=parseInt(this.recruiterScoringSchema.average)+1 && scoreObj.score<=parseInt(this.recruiterScoringSchema.good)){
      //           res.userList[key].ratingFlag = "Good";
      //         }else if(scoreObj.score>=parseInt(this.recruiterScoringSchema.good)+1 && scoreObj.score<=parseInt(this.recruiterScoringSchema.expert)){
      //           res.userList[key].ratingFlag = "Expert";
      //         }else if(scoreObj.score>=parseInt(this.recruiterScoringSchema.expert)+1 && scoreObj.score<=parseInt(this.recruiterScoringSchema.guru)){
      //           res.userList[key].ratingFlag = "Guru";
      //         }
      //     }
      // }
        this.userObj.push(res.userList[key]);
        this.filterData.push(res.userList[key]);
    });
      loading.dismiss();
    },error => {
      loading.dismiss();     
    });  
  }  
    
  gotoAddUser(){
    this.navCtrl.push(AddUserPage);
  }

  gotoEditUser(id){
    this.navCtrl.push(EditUserPage,{userId:id});
  }

  openModal(id){
    let chooseModal = this.modalCtrl.create(ModalPage,{userid : id});
    chooseModal.onDidDismiss((user:any) => {
      
      var totalUser =this.userObj;
      console.log("modaluser",user);
     // console.log("total user",totalUser);
     //this.userObj.length = 0;
     this.setFilteredLocations();
      // console.log("searched ", this.setFilteredLocations(totalUserer.email));
  });
  chooseModal.present(); 
  }

  setFilteredLocations(){
    //  this.userObj = this.filterData.filter((user) => {
    //   // console.log("testing user file"+user);
      
    //        return user.emailId.toLowerCase().indexOf(data.toLowerCase()) > -1;
         
    //    });
    var data = "adi@gmail.com";
       this.filterData = this.userObj.filter((location) => {
        return location.emailId.indexOf(data) > -1;
      });
       console.log("filet data"+this.filterData);


      }

      goBack(){
        this.navCtrl.push(HomePage)
      }

 

  // closeModal(){
    
  // }


}