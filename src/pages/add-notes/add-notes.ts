import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the AddNotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-notes',
  templateUrl: 'add-notes.html',
})
export class AddNotesPage {
  cId:string;
  token:string;
  id:string;
  userDetails:any={};
  reqId:string;
  loginUser:any;
  notes:any;
  comment:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public viewCtrl : ViewController,
    public loadingCtrl: LoadingController,) {
    this.cId = navParams.get('cId');
    this.reqId = navParams.get('reqId');
    this.token = this.util.getToken();
    this.loginUser = this.util.getSessionUser();

   // console.log('this.contactId ', this.contactId );
    this.addNotes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactmodalPage');
  }
  addNotes(){
   
    this.restProvider. candidateNotes(this.token,this.reqId,this.cId,this.loginUser)
    .then(data => {
      this.notes = data;
     console.log('this.notes',this.notes);
    //  this.util.showToast("Added sucessfuly","SUCCESS");
     
    },error => {
     
     // this.util.showToast("Something went wrong.","ERROR");
    })
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  cancelData(){
    this.viewCtrl.dismiss();
  }

  update(){
    {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
    
      if(this.comment == undefined || this.comment == ""){
        this.util.showToast("please write comments.","ERROR");
        return;
      }
    
    
      let jsonData = {
       
        'candidateId': this.cId,
        'candidateNotes': this.comment,
        'positionId': this.reqId,
        userJwtBean:{
         'emailId':this.loginUser.emailId,
          'firstName':this.loginUser.firstName,
          'id':this.loginUser.id,
          'lastName':this.loginUser.lastName,
          'role':this.loginUser.role,
          'userName':this.loginUser.userName
        }
      }
      console.log(jsonData);
    
      loading.present();   
        this.restProvider.updateNotes(this.token,jsonData)
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
 
}

