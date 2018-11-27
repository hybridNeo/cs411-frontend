import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the IonicProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class IonicProvider {
  apiUrl = 'http://localhost:5000';
  constructor(public http: HttpClient) {
    console.log('Hello IonicProvider Provider');
  }
  getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  getTopics() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/topics').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
