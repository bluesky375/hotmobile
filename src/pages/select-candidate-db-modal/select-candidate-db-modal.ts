



import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { RestProvider } from '../../providers/rest/rest';
import { CandidatePage }  from '../../pages/candidate/candidate';
import { DatePickerDirective } from 'ion-datepicker';

import moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
/**
 * Generated class for the SelectCandidateDbModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Coordinate {
  x: number;
  y: number;
}
@IonicPage()
@Component({
  selector: 'page-select-candidate-db-modal',
  templateUrl: 'select-candidate-db-modal.html',
})
export class SelectCandidateDbModalPage {
  selecteddetails:any={};
  selectedType:any;
  token:string;
  scrData:any;
  interviewType:any;
  interviewName :any;
  reqId:string;
  submissionType:string;
  selectedScr:any;
  candidates:any;
  loginUser:any;
  candidateId:string;
  emailId:string;
  recScheduledDate:string;
  recScheduledTime:string;
  chancesOfExtension:string;
  educationalYear:string;
  isBlackListed:string;
  linkedInProfileURL:string;
  relocateWithFamily:string;
  id:string;
  willingToRelocate:string;
  tempArray:Array<Object> = [];
  tempArray2:Array<any> = [];
  arr:any = [];
  workflowId:any;
  timezone:string;
  initTime:string;
  finalDate:string;
  finalTime:string;
  startDateNew:string;
  endDateNew:string;
  selectedDate:string;
  zoomCount :number= 0;
  time:string;
  timeDiv:boolean=false;
  currentReqActions:any={};
  currentCandidate : number = -1;
  
  @ViewChild(DatePickerDirective) public datepicker: DatePickerDirective;
  public localDate: Date = new Date();
  public initDate :Date = new Date();
  public initDate2 :Date = new Date();
  public startDate: Date = new Date();

  
  public min = new Date();
  @ViewChild('hourClock') hourClock;
  @ViewChild('minuteClock') minuteClock;
  hour: string;
  minute: string;
  ampm: string;
  selecting = 'hour';
  hourHandStyle: Object;
  minuteHandStyle: Object;
  hours: Array<string> = [
      '9',
      '10',
      '11',
      '12',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8'
  ];
  minutes: Array<string> = [
      '45',
      '50',
      '55',
      '00',
      '05',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40'
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public restProvider: RestProvider,
    public util: UtilsProvider,
    public loadingCtrl:LoadingController,
    public viewCtrl : ViewController) {
     
      this.selecteddetails = navParams.get('selecteddetails');
   console.log("this.selecteddetails", this.selecteddetails);

      Object.keys(this.selecteddetails).forEach(key=> {
        this.selecteddetails[key].recScheduledDate = this.initDate;  
        this.selecteddetails[key].screeningDate = this.initDate2;     
        //this.selecteddetails[key].recScheduledTime = null ;

       
   console.log("time", this.selecteddetails[key].recScheduledDate);
   console.log("date",this.selecteddetails[key].recScheduledTime);
  
   
       })
      
    this.reqId = navParams.get('reqId');
    this.workflowId = navParams.get('workflowId');
    this.loginUser = this.util.getSessionUser();
    this.currentReqActions =navParams.get('currentReqActions');
   
   console.log("selecteddetails",this.selecteddetails);
   console.log("time",this.time);
  // console.log("candidateId",this.selecteddetails.candidateId);
    this.token = this.util.getToken();
    
    this.restProvider.getRequirementUserStatics(this.token,this.reqId)
      .then((data:any)=>{
        this.scrData = data
        console.log("rizwan",this.scrData);
      },errrr=>{
      });

  }
  ionViewDidLoad() {
    const time = this.navParams.get('time');
    try {
        this.hour = time.match(/(\d+):/)[1];
        this.minute = time.match(/:(\d+)/)[1];
        this.ampm = time.match(/([AP]M)/)[1];
    } catch (error) {
        console.log('error: ', error);
        this.hour = '6';
        this.minute = '00';
        this.ampm = 'PM';
    }
    const hourAngle = this.hours.indexOf(this.hour) * 30 - 90;
    const minuteAngle = this.minutes.indexOf(this.minute) * 30 - 90;
    this.hourHandStyle = {
        '-webkit-transform': `rotate(${hourAngle}deg)`,
        '-moz-transform': `rotate(${hourAngle}deg)`,
        transform: `rotate(${hourAngle}deg)`
    };
    this.minuteHandStyle = {
        '-webkit-transform': `rotate(${minuteAngle}deg)`,
        '-moz-transform': `rotate(${minuteAngle}deg)`,
        transform: `rotate(${minuteAngle}deg)`
    };
    console.log('ionViewDidLoad SelectCandidateDbModalPage');
  }

  ////////////date///////
  public ngOnInit() {

  }
  
  showDate(){
    console.log(this.selectedDate)
  }
  public Log(stuff): void {
    this.datepicker.open();
    this.datepicker.changed.subscribe(() => console.log('test'));
    console.log(stuff);
  }

  public event(data: Date): void {
    this.localDate = data;
  }
  setDate(date:Date) {
    console.log(date);
    this.initDate = date;


  }

//////////end///////////////


//////////////
  onSelectChange(selectedValue) {

    console.log('Selected', selectedValue);
    this.submissionType = selectedValue;
    console.log("adyasa",this.submissionType);
    if(this.submissionType == 'Zoom' || this.submissionType == 'Skype'){
      this.restProvider.getRequirementUserStatics(this.token,this.reqId)
      .then((data:any)=>{
        this.scrData = data
        console.log("rizwan",this.scrData);
      },errrr=>{
      });


    }

  }
 
  

  closeModal(){
    this.navCtrl.pop();
  }
  cancelData(){
    this.viewCtrl.dismiss(this.selecteddetails);
   // this.navCtrl.pop();
  }
  goBack(){
    this.viewCtrl.dismiss();

  }
  selectdate(){
    this.timeDiv= true;
    this.currentCandidate++;
  }



 /////////date///
 getHour(angle) {
  const index = Math.round(angle / 30);
  if (index > -1 || index === -6) {
      this.hour = this.hours[Math.abs(index)];
      this.hourHandStyle = {
          '-webkit-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
          '-moz-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
          transform: `rotate(${Math.abs(index) * 30 - 90}deg)`
      };
  } else {
      this.hour = this.hours[12 - Math.abs(index)];
      this.hourHandStyle = {
          '-webkit-transform': `rotate(${(12 - Math.abs(index)) * 30 -
              90}deg)`,
          '-moz-transform': `rotate(${(12 - Math.abs(index)) * 30 -
              90}deg)`,
          transform: `rotate(${(12 - Math.abs(index)) * 30 - 90}deg)`
      };
  }
  this.selecting = 'minute';
}

getMinute(angle) {
  const index = Math.round(angle / 30);
  if (index > -1 || index === -6) {
      this.minute = this.minutes[Math.abs(index)];
      this.minuteHandStyle = {
          '-webkit-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
          '-moz-transform': `rotate(${Math.abs(index) * 30 - 90}deg)`,
          transform: `rotate(${Math.abs(index) * 30 - 90}deg)`
      };
  } else {
      this.minute = this.minutes[12 - Math.abs(index)];
      this.minuteHandStyle = {
          '-webkit-transform': `rotate(${(12 - Math.abs(index)) * 30 -
              90}deg)`,
          '-moz-transform': `rotate(${(12 - Math.abs(index)) * 30 -
              90}deg)`,
          transform: `rotate(${(12 - Math.abs(index)) * 30 - 90}deg)`
      };
  }
}

tappedClock(event) {
  const clicked: Coordinate = {
      x: event.clientX,
      y: event.clientY
  };
  const clock =
      this.selecting === 'hour' ? this.hourClock : this.minuteClock;
  const rectangle = clock.nativeElement.getBoundingClientRect();
  const clockCenter: Coordinate = {
      x: rectangle.width / 2 + rectangle.left,
      y: rectangle.height / 2 + rectangle.top
  };
  const angle =
      Math.atan2(clockCenter.y - clicked.y, clockCenter.x - clicked.x) *
      180 /
      Math.PI;

  if (this.selecting === 'hour') {
      this.getHour(angle);
  } else {
      this.getMinute(angle);
  }
}

// cancel() {
//   this.viewCtrl.dismiss();
// }

dismiss() {
  this.time =`${this.hour}:${this.minute} ${this.ampm}`
  this.selecteddetails[this.currentCandidate].recScheduledTime = this.time;
  this.timeDiv = false;
//  this.viewCtrl.dismiss(`${this.hour}:${this.minute} ${this.ampm}`);
console.log('timenjkkk',this.time)
}
submitCandidate(){
  this.zoomCount = 0;
  let totalLenght = this.selecteddetails.length;
  let countLenght = 0;
  Object.keys(this.selecteddetails).forEach(key=> { 
    let canCount = parseInt(key) + 1;
    if(this.selecteddetails[key].mySubType == undefined || this.selecteddetails[key].mySubType == ""){
      this.util.showToast("Please select submission type. for candidate "+canCount,"ERROR");
      return;
    } 
    if(this.selecteddetails[key].mySubType == 'Zoom'){
      this.zoomCount++;
      console.log("this.zoomCount",this.zoomCount)
      if(this.selecteddetails[key].selectedScr == undefined || this.selecteddetails[key].selectedScr == ""){
        this.util.showToast("Please select Screened by","ERROR");
        return;
      } 
      if(this.selecteddetails[key].recScheduledDate == undefined || this.selecteddetails[key].recScheduledDate == ""){
        this.util.showToast("Please select Date","ERROR");
        return;
      } 
      if(this.selecteddetails[key].recScheduledTime == undefined || this.selecteddetails[key].recScheduledTime == ""){
        this.util.showToast("Please select Time","ERROR");
        return;
      } 
      if(this.selecteddetails[key].timezone == undefined || this.timezone == ''){
        this.util.showToast("Please select Timezone","ERROR");
        return;
      } 
     
    }
    countLenght++;
 
    
   
  });
 
 let interviewTypes = this.tempArray2.filter(y=> y.mySubType  == 'Zoom');
 console.log("fggggg", interviewTypes);

  if(totalLenght == countLenght){
    if( this.zoomCount > 1){
      this.util.showToast("Sorry, We can't schedule more than one zoom interview here.  ","ERROR");
      return;
    } 
    if(  this.zoomCount == 1){
      this.restProvider.AvailabilityTime(this.token,moment(this.selecteddetails.recScheduledDate).format("DD-MM-YYYY"), moment(this.time, ["h:mm A"]).format("HH:mm:ss"))
      .then((data:any) => {  
        console.log('this.selecteddetails.recScheduledDate',this.selecteddetails.recScheduledDate)
        if(data == "Meeting rooms are available"){
          this.addCandidate();
          this.fromFrontend();
        }
          
        },error => {
        
        });
    }else{
      this.addCandidate();
      this.fromFrontend();
      
    }
  }
}
findObjectsInArray(data, property, value) {
  var result = [];
  data.some(function (item, i) {
  if (item[property] === value) {
  result.push(item);
  }
  });
  return result;
  }
addCandidate(){
  let loading = this.loadingCtrl.create({
        content: 'Please wait while candidate is adding...'
      });
      loading.present();
  Object.keys(this.selecteddetails).forEach(key=> {
    
    if(this.selecteddetails[key].mySubType == "One Way" || this.selecteddetails[key].mySubType == "Prospect" || this.selecteddetails[key].mySubType == "Two Way") {
      this.tempArray.push({
        'candidateId': this.selecteddetails[key].candidateId,
        'chancesOfExtension': this.selecteddetails[key].chancesOfExtension,
        'educationalYear': this.selecteddetails[key].educationalYear,
        'emailId': this.selecteddetails[key].emailId,
        'internalSubEmailTemp': "",
        'isAlreadyAdded':false,
        'isBlackListed': this.selecteddetails[key].isBlackListed,
        'linkedInProfileURL':this.selecteddetails[key].linkedInProfileURL,
        'note': this.selecteddetails[key].note,
        'relocateWithFamily': this.selecteddetails[key].relocateWithFamily,
        'requirementId': this.reqId,
        'subVendorId': this.selecteddetails[key].subVendorId,
        'submissionType': this.selecteddetails[key].mySubType,
        'willingToRelocate': this.selecteddetails[key].willingToRelocate
      })
     }
     if(this.selecteddetails[key].mySubType == 'Zoom' ) {
    
      this.tempArray.push({
        'candidateId': this.selecteddetails[key].candidateId,
        'chancesOfExtension': this.selecteddetails[key].chancesOfExtension,
        'educationalYear': this.selecteddetails[key].educationalYear,
        'emailId': this.selecteddetails[key].emailId,
        'internalSubEmailTemp': "",
        'isAlreadyAdded':false,
        'isBlackListed': this.selecteddetails[key].isBlackListed,
        'linkedInProfileURL':this.selecteddetails[key].linkedInProfileURL,
        'note': this.selecteddetails[key].note,
        'relocateWithFamily': this.selecteddetails[key].relocateWithFamily,
        'requirementId': this.reqId,
        'body':"<!DOCTYPE html><body><p>Welcome to HOT</p></body></html>",
        'recScheduledDate':'',
        'screenByUser': this.scrData[key].firstName,
        'screenByUserEmail': this.scrData[key].emailId,
        'screenByUserId':this.scrData[key].id,
        'subVendorId': this.selecteddetails[key].subVendorId,
        'submissionType': this.selecteddetails[key].mySubType,
        'willingToRelocate': this.selecteddetails[key].willingToRelocate
      })
 
     }
  })

    let jsonData={
      candidatesBean:this.tempArray,

      "user":this.loginUser,

    }
  
    jsonData.user.groupsSet=[];
    jsonData.user.technicalScreenerDetailsSkillsSet=[];

    this.restProvider.addcandidates(this.token,jsonData)
    .then((data:any) => {
      loading.dismiss();
    },error => {
      loading.dismiss();
    });
}
fromFrontend(){
  Object.keys(this.selecteddetails).forEach(key=> {   
    let jsonData2={
     body:"<!DOCTYPE html><body><p>Welcome to HOT</p></body></html>",
     candidatesId:[this.selecteddetails[key].candidateId],
     isAlreadyAdded:false,
     requirementId:this.reqId,
     subject:"Candidate Added for the Requirement",
 
   "user":this.loginUser,
    } 
    this.restProvider.fromFrontend(this.token,jsonData2)
    .then((data:any) => {
    
     this.navCtrl.push(CandidatePage,{reqId:this.reqId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
     if(this.selecteddetails[key].mySubType == "Zoom" ){
                 let jsonData3={
               
                   candidateEmail:this.selecteddetails[key].emailId,
                   candidateId:this.selecteddetails[key].candidateId,
                   date:moment(this.selecteddetails[key].recScheduledDate).format("DD-MM-YYYY"),
                   interviewRound: "1",
                   jwtDetails:{
                     emailId:this.loginUser.emailId,
                     firstName:this.loginUser.firstName,
                     id:this.loginUser.id,
                     lastName:this.loginUser.lastName,
                     role:this.loginUser.role,
                     userName:this.loginUser.userName
                   },
                     loginEmaild: this.loginUser.emailId,
                     requirementId: this.reqId,
                     screenByUser: this.scrData[key].firstName +''+this.scrData[key].lastName,
                     screenByUserEmail: this.scrData[key].emailId,
                     screenByUserId: this.scrData[key].id,
                     submissionType: this.selecteddetails[key].mySubType,
                     time: moment(this.time, ["h:mm A"]).format("HH:mm:ss"),
                     timezone:this.selecteddetails[key].timezone
                 }
 
                 this.restProvider.zoomApi(this.token,jsonData3)
                 .then((data:any) => {
 
                 //  this.restProvider.refresh(this.token)
                   //.then((data:any) => {
                   
                       this.navCtrl.push(CandidatePage,{reqId:this.reqId,workflowId:this.workflowId,currentReqActions:this.currentReqActions});
 
                   } ,error => {
                   this.util.showToast("Something went wrong.","ERROR");
                   });
 
              //    },error => {
              //      this.util.showToast("Something went wrong.","ERROR");
              //  });
             }
    },error => {
     
     })//frontend
   })
}






}
