import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  constructor(private toastCtrl: ToastController) {
  }

  // Code for Toaster
    showToast(msg,type) {
        if(type == 'ERROR'){
          let toast = this.toastCtrl.create({
             message: msg,
             duration: 3000,
             position: 'top',
             showCloseButton: true,
             cssClass: "toastCssError",
            });
            toast.present();  
        }else if(type == 'SUCCESS'){
          let toast = this.toastCtrl.create({
             message: msg,
             duration: 3000,
             position: 'top',
             showCloseButton: true,
             cssClass: "toastCssSuccess",
            });
            toast.present();
        }else if(type == 'TIMEOUT'){
          let toast = this.toastCtrl.create({
             message: msg,
             duration: 3000,
             position: 'top',
             showCloseButton: true,
             cssClass: "toastCssTimeOut",
            });
            toast.present();
        }
    }

    // Login token Handling
      getToken(){
        return JSON.parse(window.localStorage.getItem('token'));
      }
      saveToken(token){
        window.localStorage.setItem( 'token',JSON.stringify(token));
      }
      saveTokenTime(time){
        window.localStorage.setItem( 'userTokenStartTime',JSON.stringify(time));
      }
      getTokenTime(){
        return JSON.parse(window.localStorage.getItem('userTokenStartTime'));
      }
      removeToken(){
        window.localStorage.setItem( 'token',null);
      }
      saveSessionUser(user){
        window.localStorage.setItem( 'sessonUser',JSON.stringify(user));
      }
      getSessionUser(){
        return JSON.parse(window.localStorage.getItem('sessonUser'));
      }

      removeAllLocalStorage(){
        window.localStorage.setItem( 'sessonUser',null);
        window.localStorage.setItem( 'token',null);
        window.localStorage.setItem( 'userTokenStartTime',null);
      }

      emailValidate(email) {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
         if (reg.test(email) == false){
             return false;
         }
         return true;
     }
     contactValidate(contact) {
      let reg =/^[0-9]{10}$/;
       if (reg.test(contact) == false){
           return false;
       }
       return true;
   }

   nameValidate(name) {
    let reg = /[A-Za-z]/;
     if (reg.test(name) == false){
         return false;
     }
     return true;
 }
 urlValidate(url) {
  let reg =/\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/g;
   if (reg.test(url) == false){
       return false;
   }
   return true;
  }
}
