import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class SampleService {
  url:String=environment.apiurl;
  constructor(private http: HttpClient,private router:Router) { }

  useraddservice(data: any): Observable<any> {
    return this.http.post<any>(environment.apiurl+'/add', data)
  }
  userlistservice(): Observable<any> {
    return this.http.get<any>(environment.apiurl+'/list')
  }
  userdeleteservice(data: any): Observable<any> {
    return this.http.post<any>(environment.apiurl+'/delete', data)
  }
}
