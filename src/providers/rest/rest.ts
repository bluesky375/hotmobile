import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl = "https://qa.hookedontalent.com/";
  //apiUrl = "http://172.16.18.48:8080/";
  
  constructor(public http: HttpClient,public https: Http) {
    console.log('Hello RestProvider Provider');

    
  }

  forgotPassword(email) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hotlab/forgetPassword', email,{
        headers: new HttpHeaders().set('Content-Type', 'application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  forgotPasswordEmail(email) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hotlab/forgetPassword', email,{
        headers: new HttpHeaders().set('Content-Type', 'application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getToken(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/security/auth/', JSON.stringify(data),{
        headers: new HttpHeaders().set('Content-Type', 'application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(data,token) {
    return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'/hot/login/', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
               .append('Accept', 'application/json;odata=verbose')
               .append('Content-Type','application/json')
              
     }).subscribe(res => {
      console.log('req',res)

        resolve(res);
      }, (err) => {
       console.log('err',err)

        reject(err);
      });
 
  
    });
  }
  newLogin(data,token) {
    console.log('token1111',token);
    return new Promise((resolve, reject) => {
   
        this.http.post(this.apiUrl+'/hot/newLogin/', JSON.stringify(data),{
          headers: new HttpHeaders().set('Authorization',token)
                   .append('Access-Control-Allow-Origin', '*')
                   .append('Access-Control-Allow-Credentials', 'true')
                   .append('Access-Control-Allow-Methods','POST')
                    .append('Accept', 'application/json')
                    .append('Content-Type','application/json')
                    
                  
         }).subscribe(res => {
          console.log('token222',token);
           console.log('req',res)
            resolve(res);
          }, (err) => {
           console.log('err',err)
  
            reject(err);
          });
     //}
     
    });
    
  }
  
  getRoles(token) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/roles',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteRoles(data,token) {
    let url = 'hot/roles/delete/'+data.roleId+'/'+data.loginUser.id+'/'+data.loginUser.firstName+'/'+data.loginUser.lastName+'/'+data.loginUser.userName+'/'+data.loginUser.role;
    return new Promise(resolve => {
      this.http.delete(this.apiUrl+url,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
        resolve(res);
      }, err => {
        console.log(err);
      });
    });
  }

  refreshToken(token) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'security/refresh',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  trackRec(data,token) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/trackRec', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
        .append('Accept', 'application/json;odata=verbose')
        .append('Content-Type','application/json')
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
      });
  }
  
 
  trackTS(token) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/trackTS',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });  
  }

  getRequirementStatics(data,token) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/getRequirementStatics', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  countOfUsers(data,token) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/dashBoard/countOfUsers', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  } 
  

  getDashBoardCounts(data,token) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/getDashBoardCounts', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  users(token) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/users',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
        //console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  vpOfSales(id,token) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/displayalltechrec/'+id+'/VpOfSales',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);    
      }, err => {
        console.log(err);
      });
    }); 
  } 

  groupName(token) {   
    return new Promise(resolve => {  
      this.http.get(this.apiUrl+'hot/roles/groupName',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  managerOfRecruiting(id,token) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/displayalltechrec/'+id+'/ManagerOfRecruiting',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  submitUsers(data,token){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/user/create', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  editUsers(id,token){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/user/'+id,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  getRolesById(id,token){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/roles/'+id,{
        headers: new HttpHeaders().set('Authorization', token)

                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  vpofSales(token){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/displayalltechrec/0/VpOfSales',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
 

  updateUserById(data,token){
    // return new Promise((resolve, reject) => {
    //   this.http.put(this.apiUrl+'hot/user/update', JSON.stringify(data),{
    //     headers: new Headers().set('Authorization', token)
    //   //  .append('Accept', 'application/json;odata=verbose')
    //    // .append('Content-Type','application/json')
       
    //    }).subscribe(res => {
    //      console.log('i m here success',res);
    //       resolve(res);
    //     }, (err) => {
    //       console.log('i m here error',err);
    //       reject(err);
    //     });
    // });
    
    return new Promise((resolve, reject) => {
      let headerss = new Headers()
      headerss.set('Authorization', token)
      headerss.append('Accept', 'application/json;odata=verbose')
      headerss.append('Content-Type','application/json');
     
     this.https.put(this.apiUrl+'hot/user/update', JSON.stringify(data),{headers: headerss
    }).toPromise()
      .then(res => resolve(res)) //Things went well....
      .catch(err => console.log(err)); 
      });

     
  }
 

  changeUserStatusById(data,token){
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'hot/user/reset/'+data.userId,JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  changeUserStatusSendEmailById(data,token){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'hot/user/reset/mail/'+data.userId,JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  changeUserpasswordById(data,token){
    return new Promise(resolve => {
      this.http.put(this.apiUrl+'hot/user/status/'+data.userId+'/'+data.status,JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  changeUserpasswordsendMailById(data,token){
    return new Promise(resolve => {
      this.http.post(this.apiUrl+'hot/user/'+data.userId+'/'+data.status,JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  downloadResumeById(data,token){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'downloadResume/'+data.userId,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

 // hot/requirements/allOpen/{role}/{userId}/{userName}
  // getRequirements(token,user) {
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'hot/requirements/Admin/'+user.id+'/admin',{
  //       headers: new HttpHeaders().set('Authorization', token)
  //               .append('Accept', 'application/json;odata=verbose')
  //               .append('Content-Type','application/json')
  //      }).subscribe(data => {
  //       resolve(data);
  //     //  console.log(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }
  getRequirements(token,user) {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirements/allOpen/'+user.role+'/'+user.id+'/'+user.userName,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      //  console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  randomId(token) {   
    return new Promise(resolve => {  
      this.http.get(this.apiUrl+'hot/requirement/randomId',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  randomClientId(token,user) {   
    return new Promise(resolve => {  
      this.http.get(this.apiUrl+'hot/client/clientNames/'+user.role+'/'+user.id,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
    
  }

  submitRequirement(data,token){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/create', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    }); 
  }
  clientNameForRequirement(clientName,token){
    return new Promise(resolve => {  
      this.http.get(this.apiUrl+'hot/client/clientNameForRequirement/'+clientName,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  contactDetails(id,token){
    return new Promise(resolve => {  
      this.http.get(this.apiUrl+'hot/client/contactDetails/'+id,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  

  updateContact(data,token){
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl+'hot/client/updateContact', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
       //  console.log('i m here success',res);
          resolve(res);
        }, (err) => {
          console.log('i m here error',err);
          reject(err);
        });
    }); 
  }

  addContact(data,token){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/client/addContact', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  } 

  activateContact(data,token){
    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl+'hot/client/clientContact/activate', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
        // console.log('i m here success',res);
          resolve(res);
        }, (err) => {
          console.log('i m here error',err);
          reject(err);
        });
    }); 
  }

  editRequirements(id,token){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/'+id,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // candidates(token,reqId,user){
  //   return new Promise(resolve => {
  //     this.http.get(this.apiUrl+'hot/requirement/candidates/'+reqId+'/'+user.id+'/'
  //     +user.firstName+'/'+user.lastName+'/'+user.userName+'/'+user.role,{
  //       headers: new HttpHeaders().set('Authorization', token)
  //               .append('Accept', 'application/json;odata=verbose')
  //               .append('Content-Type','application/json')
  //      }).subscribe(data => {
  //       resolve(data);
  //     }, err => {
  //       console.log(err);
  //     });
  //   });
  // }

  candidates(token,reqId,user){
    return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirementCandidate/get/reqCandidates/'+reqId,{
    headers: new HttpHeaders().set('Authorization', token)
    .append('Accept', 'application/json;odata=verbose')
    .append('Content-Type','application/json')
    }).subscribe(data => {
    resolve(data);
    }, err => {
    console.log(err);
    });
    });
    }
    

  candidateResponse(token,id,candidateId){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/candidate/response/'+id+'/'+candidateId,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  candidatesfromdb(token,candidateId){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/candidatesfromdb/'+candidateId,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  responseBycandidateId(token,candidateId){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/candidate/'+candidateId,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
 

  technicalupdateScore(token,data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/candidate/response/updateScore/technical', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateResult(token,data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/candidate/response/updateResult', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  email(token,data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/candidate/response/updateResult/email', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateScoreById(token,id,candidateId){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/candidate/update/score/'+id+'/'+candidateId,{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
      }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  technicalQuestions(token,candidateId){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/'+candidateId+'/'+'technical',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  technicalQuestionsDb(token,candidateId){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/question/'+candidateId+'/'+'technical',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  generalQuestionsDb(token,candidateId){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/question/'+candidateId+'/'+'general',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  addTecQuestionFromDB(token,data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/addQuestionFromDB', JSON.stringify(data),{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  generalQuestions(token,candidateId){
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/'+candidateId+'/'+'general',{
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

 editCandidateById(token,candidateId,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/candidate/requirementCandidate/'+candidateId+'/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
 } 

 editCandidate(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
 } 

 updateCandidate(data,token){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/candidate/update', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
      // console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}
downloadCandidateResume(token,id,user){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/candidate/resume/'+id+'/'+user.id+'/'+user.firstName+'/'+user.lastName+'/'
    +user.userName+'/'+user.role,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
 } 
 saveCandidateResume(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/save/candidate/resume/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
 } 
submitCandidate(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/candidate/create', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
//requirement
allowedActions(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/allowedActions',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
regenerateLink(token,reqId,candidateId,user){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/regenerate/'+reqId+'/'+candidateId+'/'+user.id+'/'
    +user.firstName+'/'+user.lastName+'/'+user.userName+'/'+user.role,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

regenerateEmail(token,reqId,candidateId,user){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/regenerate/mail/'+reqId+'/'+candidateId+'/'+user.id+'/'
    +user.firstName+'/'+user.lastName+'/'+user.userName+'/'+user.role,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

reactivateLink(token,reqId,candidateId,user){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/reactivate/'+reqId+'/'+candidateId+'/'+user.id+'/'
    +user.firstName+'/'+user.lastName+'/'+user.userName+'/'+user.role,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}


reactivateEmail(token,reqId,candidateId,user){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/reactivateEmail/'+reqId+'/'+candidateId+'/'+user.id+'/'
    +user.firstName+'/'+user.lastName+'/'+user.userName+'/'+user.role,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

updateRequirement(data,token){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/requirement/update', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
     //  console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}

displayTechScreener(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displaytechscreener/'+reqId,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

displayRecruiter(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayrecruiter/'+reqId,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

displayAccountManager(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayAccountManager/'+reqId,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

displayVpOfSales(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayVpOfSales/'+reqId,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

displayManagerOfRecruiting(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayManagerOfRecruiting/'+reqId,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
AccountManagerById(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayalltechrec/'+reqId+'/AccountManager',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

TechnicalScreenerById(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayalltechrec/'+reqId+'/TechnicalScreener',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

VpOfSalesById(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayalltechrec/'+reqId+'/VpOfSales',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

ManagerOfRecruitingById(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayalltechrec/'+reqId+'/ManagerOfRecruiting',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

RecruiterById(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayalltechrec/'+reqId+'/Recruiter',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

selectTechscreener(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/techscreener',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
selectRecruiter(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/recruiter',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
selectmanagerOfRecruiting(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/managerOfRecruiting',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
selectvpOfSales(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/vpOfSales',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
selectaccountManager(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/accountManager',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

deleteAccountManager(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/deleteAccountManager',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

deletetechscreener(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/deletetechscreener',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

deleteVpOfSales(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/deleteVpOfSales',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

deleteManagerOfRecruiting(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/deleteManagerOfRecruiting',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}


deleterecruiter(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/deleterecruiter',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

requirementResource(token,reqId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/resource/'+reqId,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

ccRequirement(data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/ccRequirement',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

opencloseMail(token,reqId,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/opencloseMail/Open/'+reqId,JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
openclose(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/requirement/openclose', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
       console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}

addNoMoreCandidate(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/addNoMoreCandidate',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
addNoMoreCandidateMail(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/addNoMoreCandidateMail',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
//subvendor
getSubVendors(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/subVendor/subVendors',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
getRandomId(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/subVendor/getRandomId',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
deleteSubVendor(token,id) {
  let url = 'hot/subVendor/delete/'+id;
  return new Promise(resolve => {
    this.http.delete(this.apiUrl+url,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
      resolve(res);
    }, err => {
      console.log(err);
    });
  });
}

updateVendorBlackListStatus(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/subVendor/updateVendorBlackListStatus/', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
       console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}

subVendorDetailsAndContact(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/subVendor/subVendorDetailsAndContact/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

updateSubVendor(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/subVendor/updateSubVendor', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
       console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}

createsubVendor(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/subVendor/create',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

//getClients
getClients(token,user){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/clients/'+user.firstName+'/'+user.id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

engagement(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/engagement',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
industry(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/industry',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

clientDetailAndContact(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/clientDetailAndContact/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

updateClient(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/clientNew/update', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
       console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}

enableDisableClient(token,id,user){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/client/enableDisableClient/'+id+'/'+user.id+'/'
    +user.firstName+'/'+user.lastName+'/'+user.userName+'/'+user.role,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

updateClientBlackListStatus(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/client/updateClientBlackListStatus/', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
       console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}

changeAccountManager(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot//requirement/displayalltechrec/'+id+'/AccountManager',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

changeClientAssigne(token,Aid,user,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/client/changeClientAssigne/'+Aid+'/'+user.userName+'/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });

}

createclient(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/clientNew/create',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

clientMail(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/clientMail/create',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

getCandidates(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/candidates',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

deleteCandidate(token,id,user) {
  let url = 'hot/candidate/delete/'+id+'/'+user.id+'/'+user.firstName+'/'+user.lastName+'/'+user.userName+'/'+user.role;
  return new Promise(resolve => {
    this.http.delete(this.apiUrl+url,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
      resolve(res);
    }, err => {
      console.log(err);
    });
  });
}

historyCandidate(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/candidate/history/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
updateCandidateBlackListStatus(data,token){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/candidate/updateCandidateBlackListStatus/', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
     //  console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}
techQuestion(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/question/technical',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
editTechQuestion(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/question/Technical/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
genQuestion(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/question/general',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
editgenQuestion(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/question/general/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
domain(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'question/domain',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
addTechnicalQuestion(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/question/create',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
updateQuestion(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/question/update', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
     //  console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  }); 
}
TechnicalScreener(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/displayalltechrec/0/TechnicalScreener',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

AccountsUnpaid(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/accounts/tsDetails/unpaid',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

AccountsPaymentDetails(token,reqId,tsId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/accounts/tsPaymentDetails/'+reqId+'/'+tsId,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

AccountsPaid(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/accounts/tsDetails/paid',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

AccountsPaymentReject(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/accounts/tsPaymentReject',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
editCandidateFromDb(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/candidate/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
getRequirementUserStatics(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/getRequirementUserStatics/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
removeCandidate(token,reqId,id,user) {
  let url = 'hot/requirement/removeCandidate/'+reqId+'/'+id+'/'+user.id+'/'+user.firstName+'/'+user.lastName+'/'+user.userName+'/'+user.role;
  return new Promise(resolve => {
    this.http.delete(this.apiUrl+url,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
      resolve(res);
    }, err => {
      console.log(err);
    });
  });
}

disableCandidate(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/disableCandidate',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
disableCandidateEmail(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/disableCandidate/email',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
refresh(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'security/refresh',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}
candidateNotes(token,reqId,id,user){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/candidate/notes/'+reqId+'/'+id+'/'+user.role,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  }); 
}
updateNotes(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/requirement/candidate/notes/update', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
     //  console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  });  
}

interviewResponse(token,linkId,id,candidateId){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/zoomLink/interview/response/'+linkId+'/'+id+'/'+candidateId,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}

screenerFeedBack(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/req/screener/feedBack',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}

revertSubVendorSchema(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/score/revert/subVendorSchema', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
     //  console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  });  
}
tsDetails(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/score/get/tsDetails',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}
tsScoringSchema(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/score/tsScoringSchema',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
revertTsSchema(token,data){
  return new Promise((resolve, reject) => {
    this.http.put(this.apiUrl+'hot/score/revert/tsSchema', JSON.stringify(data),{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
     //  console.log('i m here success',res);
        resolve(res);
      }, (err) => {
        console.log('i m here error',err);
        reject(err);
      });
  });  
}

changePassword(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/user/changePassword',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
getLibraryVideos(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/user/getLibraryVideos',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}
deleteVideo(token,id) {
  let url = 'hot/user/deleteVideo/'+id;
  return new Promise(resolve => {
    this.http.delete(this.apiUrl+url,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
      resolve(res);
    }, err => {
      console.log(err);
    });
  });
}

getRequirementCandidateStatics(token,id){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/getRequirementCandidateStatics/'+id,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}
addcandidates(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/addcandidates',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
fromFrontend(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/addcandidates/mail/fromFrontend',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
zoomApi(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/integrate/zoomApi',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
skypeApi(token,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/generateToken/skypeApi',JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
AvailabilityTime(token,date,time){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/meetingRooms/Availability/'+date+'/'+time,{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}
submitQuestions(token,reqId,data){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/submitQuestions/'+reqId,JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
submitQuestionsMail(reqId,data,token){
  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl+'hot/requirement/submitQuestions/mail/'+reqId,JSON.stringify(data), {
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
  });
}
detailsForDropdown(token){
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/requirement/detailsForDropdown',{
      headers: new HttpHeaders().set('Authorization', token)
              .append('Accept', 'application/json;odata=verbose')
              .append('Content-Type','application/json')
     }).subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });  
}


mutlipleRoundsSelfRating(token,id,candidateId){
  return new Promise(resolve => {
  this.http.get(this.apiUrl+'hotlabs/req/get/mutlipleRounds/selfRating/'+id+'/'+candidateId,{
  headers: new HttpHeaders().set('Authorization', token)
  .append('Accept', 'application/json;odata=verbose')
  .append('Content-Type','application/json')
  }).subscribe(data => {
  resolve(data);
  }, err => {
  console.log(err);
  });
  });
  }
  getTop3Req(token,candidateId){
  return new Promise(resolve => {
  this.http.get(this.apiUrl+'hot/requirement/getTop3Req/'+candidateId,{
  headers: new HttpHeaders().set('Authorization', token)
  .append('Accept', 'application/json;odata=verbose')
  .append('Content-Type','application/json')
  }).subscribe(data => {
  resolve(data);
  }, err => {
  console.log(err);
  });
  });
  }
  screenerFeedBackInterviewRound(token,id,candidateId,interviewRounds){
  return new Promise(resolve => {
  this.http.get(this.apiUrl+'hot/screener/feedBack/'+id+'/'+candidateId+'/'+interviewRounds,{
  headers: new HttpHeaders().set('Authorization', token)
  .append('Accept', 'application/json;odata=verbose')
  .append('Content-Type','application/json')
  }).subscribe(data => {
  resolve(data);
  }, err => {
  console.log(err);
  });
  }); 
  }

  reviewQuestions(token,data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/reviewQuestions',JSON.stringify(data), {
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  reviewQuestionsMail(token,data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'hot/requirement/reviewQuestionsMail',JSON.stringify(data), {
        headers: new HttpHeaders().set('Authorization', token)
                .append('Accept', 'application/json;odata=verbose')
                .append('Content-Type','application/json')
       }).subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  hotZoomVideo(token,zoomid,id,candidateId){
    return new Promise(resolve => {
    this.http.get(this.apiUrl+'hot/zoom/video/'+zoomid+'/'+id+'/'+candidateId,{
    headers: new HttpHeaders().set('Authorization', token)
    .append('Accept', 'application/json;odata=verbose')
    .append('Content-Type','application/json')
    }).subscribe(data => {
    resolve(data);
    }, err => {
    console.log(err);
    });
    }); 
    }
    getAssoicatedUsers(token,candidateId){
      return new Promise(resolve => {
      this.http.get(this.apiUrl+'hot/requirement/get/assoicatedUsers/'+candidateId,{
      headers: new HttpHeaders().set('Authorization', token)
      .append('Accept', 'application/json;odata=verbose')
      .append('Content-Type','application/json')
      }).subscribe(data => {
      resolve(data);
      }, err => {
      console.log(err);
      });
      }); 
      }
      reqTimeLapse(token,candidateId){
        return new Promise(resolve => {
        this.http.get(this.apiUrl+'hot/req/timeLapse/'+candidateId,{
        headers: new HttpHeaders().set('Authorization', token)
        .append('Accept', 'application/json;odata=verbose')
        .append('Content-Type','application/json')
        }).subscribe(data => {
        resolve(data);
        }, err => {
        console.log(err);
        });
        }); 
        }
      getAlluserReq(token,candidateId){
        return new Promise(resolve => {
        this.http.get(this.apiUrl+'hot/requirement/get/allUsers/forReq/'+candidateId,{
        headers: new HttpHeaders().set('Authorization', token)
        .append('Accept', 'application/json;odata=verbose')
        .append('Content-Type','application/json')
        }).subscribe(data => {
        resolve(data);
        }, err => {
        console.log(err);
        });
        }); 
        }

        addCsm(token,data){
          return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'hot/requirement/addCsm',JSON.stringify(data), {
              headers: new HttpHeaders().set('Authorization', token)
                      .append('Accept', 'application/json;odata=verbose')
                      .append('Content-Type','application/json')
             }).subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        }

        recruiterMail(data,token){
          return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'hot/requirement/recruiter/mail',JSON.stringify(data), {
              headers: new HttpHeaders().set('Authorization', token)
                      .append('Accept', 'application/json;odata=verbose')
                      .append('Content-Type','application/json')
             }).subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        }

        updateuserStatusToReq(cId,reqId,cName,data,token){
          return new Promise((resolve, reject) => {
            this.http.put(this.apiUrl+'hot/requirement/update/userStatusToReq/'+cId+'/' +reqId+'/'+cName,JSON.stringify(data),{
              headers: new HttpHeaders().set('Authorization', token)
                      .append('Accept', 'application/json;odata=verbose')
                      .append('Content-Type','application/json')
             }).subscribe(res => {
             //  console.log('i m here success',res);
                resolve(res);
              }, (err) => {
                console.log('i m here error',err);
                reject(err);
              });
          });  
        }
        deleteCSM(data,token){
          return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'hot/requirement/deleteCSM',JSON.stringify(data), {
              headers: new HttpHeaders().set('Authorization', token)
                      .append('Accept', 'application/json;odata=verbose')
                      .append('Content-Type','application/json')
             }).subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        }
        logsforUsers(data,token){
          return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'hot/req/logsforUsers',JSON.stringify(data), {
              headers: new HttpHeaders().set('Authorization', token)
                      .append('Accept', 'application/json;odata=verbose')
                      .append('Content-Type','application/json')
             }).subscribe(res => {
                resolve(res);
              }, (err) => {
                reject(err);
              });
          });
        }
        leadStatusToReq(cId,reqId,data,token){
          return new Promise((resolve, reject) => {
            this.http.put(this.apiUrl+'hot/requirement/update/leadStatusToReq/'+cId+'/' +reqId,JSON.stringify(data),{
              headers: new HttpHeaders().set('Authorization', token)
                      .append('Accept', 'application/json;odata=verbose')
                      .append('Content-Type','application/json')
             }).subscribe(res => {
             //  console.log('i m here success',res);
                resolve(res);
              }, (err) => {
                console.log('i m here error',err);
                reject(err);
              });
          });  
        }

        deleteleadFromReq(reqId,uId,token) {
          return new Promise(resolve => {
            this.http.delete(this.apiUrl+'hot/delete/leadFromReq/'+reqId+'/'+uId,{
              headers: new HttpHeaders().set('Authorization', token)
                      .append('Accept', 'application/json;odata=verbose')
                      .append('Content-Type','application/json')
             }).subscribe(res => {
              resolve(res);
            }, err => {
              console.log(err);
            });
          });
        }
  }
