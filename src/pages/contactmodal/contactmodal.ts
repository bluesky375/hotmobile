import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
/**
 * Generated class for the ContactmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactmodal',
  templateUrl: 'contactmodal.html',
})
export class ContactmodalPage {
  contactId:string;
  token:string;
  id:string;
  contactdetails:any={};
  contact:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public viewCtrl : ViewController) {
    this.contactId = navParams.get('contactid');
    this.contact = navParams.get('contact');
    this.token = this.util.getToken();
   // console.log('this.contactId ', this.contactId );
    this.contactDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactmodalPage');
  }
  contactDetails(){
     this.restProvider.contactDetails(this.contactId,this.token)
    .then((data:any)=>{
       this.contactdetails =data[0];
      //console.log("contactdetails",this.contactdetails);
    },errrr=>{
      //console.log(errrr);
    });
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  cancelData(){
    this.viewCtrl.dismiss();
  }
  editData(){
    this.restProvider.updateContact(this.contact,this.token)
    .then((data:any)=>{
      // this.contactdetails =data[0];
      //console.log("contactdetails",this.contactdetails);
    },errrr=>{
     // console.log(errrr);
    });
  }
}
