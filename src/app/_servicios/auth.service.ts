import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

interface auth {
  accessToken : string;
  refreshToken : string;
  userId : string;
}

@Injectable()

export class AuthService {

  private url: string = "http://178.128.71.20:8080";

  constructor(private http: HttpClient) { }

  login(usuario){
    return this.http.post<auth>(`${this.url}/auth/` , usuario , {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }


}
