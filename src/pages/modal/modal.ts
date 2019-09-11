import { Component,ViewChild } from '@angular/core';
import { ViewController,IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { UtilsProvider } from '../../providers/utils/utils';
import { SelectSearchableComponent } from 'ionic-select-searchable';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({})
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  @ViewChild('myselect') selectComponent: SelectSearchableComponent;
 // token:string;
  user:any={};
  userObj:Array<Object> = [];
  userdetail : any={
    'username':"",
    'email':"",
    'status':"",
    'ratings':""
  };
 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl : ViewController,public restProvider: RestProvider,
    public loadingCtrl: LoadingController,
    public util :UtilsProvider) {
  }
  userChanged(event: { component: SelectSearchableComponent, value: any}) {
    // User was selected
  }
  onClose() {
   
  }
 
  openFromCode() {
    this.selectComponent.open();
  }
  ionViewDidLoad() {
     
  } 

  closeModal(){
    this.viewCtrl.dismiss();
  }
  resetData(){
    this.viewCtrl.dismiss(); 
  }
  // users(token){ 
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();
  //   this.restProvider.users(token)
  //   .then((res:any) => {
    
  //     Object.keys(res.userList).forEach(key=> {
      
  //       this.userObj.push(res.userList[key]);
  //   });
  //     loading.dismiss();
  //   },error => {
  //     loading.dismiss();     
  //   });  
  // }  

  //  searchData2(token){
  //   let loading = this.loadingCtrl.create({
  //   content: 'Please wait...'
  // });
  // loading.present();
  // this.restProvider.users(token)
  // .then((res:any) => {
  
  //   Object.keys(res.userList).forEach(key=> {
    
  //     this.userObj.push(res.userList[key]);
  // });
  //   loading.dismiss();
  // },error => {
  //   loading.dismiss();     
  // });  
  //  }

   searchData(){
     let item = {
       'username'     :   this.userdetail.username,
       'email'        :   this.userdetail.email,
       'status'       :   this.userdetail.status,
       'ratings'      :   this.userdetail.ratings,
     }
    this.viewCtrl.dismiss(item);
   }
   

}
