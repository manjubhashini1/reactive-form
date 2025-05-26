import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  private apiUrl = "https://jsonplaceholder.typicode.com/posts"

  constructor(private http: HttpClient) { }

  getData():Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearee Token',
      'Custom-Header': 'CustomHeader'
    })
     return this.http.get(this.apiUrl, { headers });
  }

  postData(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer token',
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl, data, {headers});
  }
}
