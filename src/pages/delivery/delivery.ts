import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DeliveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-delivery',
  templateUrl: 'delivery.html',
})
export class DeliveryPage {

  delvery: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.delvery = [{
      'subject':"Order",
      'status':true,
      'dateAndTime':'20/12/2018 , 11:30 am', 
      'upDateStaus':[{
        'salerSubject':"item is palced your order",
        'status':true,
        'date':"20/12/2018",
        'time':"11:30 AM"
      },{
        'salerSubject':"seller is process your order",
        'status':true,
        'date':"21/12/2018",
        'time':"12:30 AM"
      }]

    },
    {
      'subject':"Packed",
       'status':true,
      'dateAndTime':'20/12/2018 , 11:30 am', 
      'upDateStaus':[{
        'salerSubject':"item is palced your order",
        'status':true,
        'date':"20/12/2018",
        'time':"11:30 AM"
      },{
        'salerSubject':"seller is process your order",
        'status':true,
        'date':"21/12/2018",
        'time':"12:30 AM"
      }]

    },{
      'subject':"Shipped",
      'status':false,
      'dateAndTime':'20/12/2018 , 11:30 am', 
      'upDateStaus':[{
        'salerSubject':"item is palced your order",
        'status':true,
        'date':"20/12/2018",
        'time':"11:30 AM"
      },{
        'salerSubject':"seller is process your order",
        'status':true,
        'date':"21/12/2018",
        'time':"12:30 AM"
      }]

    },{
      'subject':"Delivered",
      'status':false,
      'dateAndTime':'20/12/2018 , 11:30 am', 
      'upDateStaus':[{
        'salerSubject':"item is palced your order",
        'status':false,
        'date':"20/12/2018",
        'time':"11:30 AM"
      },{
        'salerSubject':"seller is process your order",
        'status':false,
        'date':"21/12/2018",
        'time':"12:30 AM"
      }]

    }]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DelveryPage');
  }
}
