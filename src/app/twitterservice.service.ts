import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TwitterserviceService {

  api_url = 'http://localhost:3000';
  subObj: any;
  constructor(private http: HttpClient) { 
    this.subObj = new BehaviorSubject(1);
  }

  getTimeline() {
    return this.http
      .get(this.api_url+'/home_timeline').subscribe(
        values => {
          console.log('response sent to component')
          this.subObj.next(values);
        },
        error => {
          console.log(error.message)
        }
      );
  }

  getLeffs(user)  {
    let params = new HttpParams().set("handle",user);
    return this.http
      .get(this.api_url+'/leffen_timeline', {params: params}).subscribe(
        values => {
          console.log('response sent to component')
          this.subObj.next(values);
        },
        error => {
          console.log(error.message)
        }
      );
  }
}
