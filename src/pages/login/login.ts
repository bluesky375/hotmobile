import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,MenuController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isLogin:boolean = true;
  username:string;
  password:string;
  email:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: UtilsProvider,
              public restProvider: RestProvider,
              public loadingCtrl: LoadingController,
              public menuCtrl: MenuController) {
              this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if(this.username == undefined || this.username == ""){
      this.util.showToast("Please enter username.","ERROR");
      return;
    }

    if(this.password == undefined || this.password == ""){
      this.util.showToast("Please enter password.","ERROR");
      return;
    }


    loading.present();
    let getToken = {
      'username':this.username,
      'password':this.password
    }

    let jsonData = {
      'userName':this.username,
      'password':this.password
    }
    this.restProvider.getToken(getToken)
    .then((token:any) => {
      console.log('token',token.token);
      this.util.saveToken(token.token);
      this.util.saveTokenTime(new Date().getTime());
      this.restProvider.newLogin(jsonData,token.token)
      .then(data => {
        this.util.saveSessionUser(data);
        loading.dismiss();
        this.util.showToast("Successfully Login.","SUCCESS");
        this.navCtrl.push(HomePage);
      },error => {
          loading.dismiss();
          this.util.showToast("Something went wrong.","ERROR");
          console.log(error);
      });

        this.restProvider.login(jsonData,token.token)
        .then(data => {
          this.util.saveSessionUser(data);
        //  loading.dismiss();
         // this.util.showToast("Successfully Login.","SUCCESS");
        //  this.navCtrl.push(HomePage);
        },error => {
          //  loading.dismiss();
         //   this.util.showToast("Something went wrong.","ERROR");
            console.log(error);
        });
    },error => {
        loading.dismiss();
        this.util.showToast("Something went wrong.","ERROR");
        console.log(error);
    });
  }

  forgotPassword(){
    this.isLogin = false;
  }

  gotoLogin(){
    this.isLogin = true;
  }

  resetPassword(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    if(this.email == undefined || this.email == ""){
      this.util.showToast("Please enter email address.","ERROR");
      return;
    }
    if(!this.util.emailValidate(this.email)){
      this.util.showToast("Email address is not valid.","ERROR");
      return;
    }
    loading.present();
    this.restProvider.forgotPassword(this.email)
    .then(res => {
        loading.dismiss();
        this.util.showToast("Passowrd reset Successfully, Please check your email","SUCCESS");
        this.isLogin = true;
        this.restProvider.forgotPasswordEmail(this.email).then(res => {
          this.email = "";
        },error => {});
    },error => {
        loading.dismiss();
        this.util.showToast("Something went wrong.","ERROR");
        console.log(error);
    });

  }

}
