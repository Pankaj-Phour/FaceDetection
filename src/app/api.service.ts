import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http:HttpClient) { }



  // Api call Functions 

  // Api to get data of dummy users for the dashboard 
  getUser(endpoint:any){
    return this.http.get(environment.User + endpoint)
  }

  // Api to get stats of the dummy users for dashboard 
  getstats(endpoint:any){
    return this.http.get(environment.Stats + endpoint)
  }

  // Api to post user's recorded video 
  postVideo(endpoint:any,params:any){
    return this.http.post(environment.Url + endpoint,params)
  }

  // Api to get all users all data 
  getRecordings(endpoint:any){
    return this.http.get(environment.Url + endpoint)
  }

  // Api to get the details of all users 
  getAllUsers(endpoint:any){
    return this.http.get(environment.Url + endpoint)
  }


  
  // Behaviour subjects 

  input = new BehaviorSubject<any>('');
  input$ = this.input.asObservable();

  dashboard = new BehaviorSubject<any>('');
  dashboard$  = this.dashboard.asObservable();
}
