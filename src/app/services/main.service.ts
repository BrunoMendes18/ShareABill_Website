import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http : HttpClient) {}

  linkLogin = "/api/auth/signin";
  linkRegistar = "/api/auth/signup";
  linkGrupos = "api/v1/grupo/";

  userToken : string | null ="";
  userId: any;

  doLogIn(email: string, password: string){
    return this.http.post(this.linkLogin, ({email: email, password: password}));
  }

  doRegistar(name: string, email:string, password:string){
    return this.http.post(this.linkRegistar, ({name: name,email: email, password: password}));
  }

  seeGrupos(){
   /*  let headers = new HttpHeaders();
    let body = new HttpParams();

    const authorization = 'bearer ' + this.userToken;

    headers = headers.append('authorization', authorization); */
    let reqBodyObj = {'user_id': this.userId}

    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })/*
      body: new HttpParams({
        'fromObject': reqBodyObj,
      }),
      responseType: 'text' as 'json'*/
    };

    console.log(httpOptions);

    console.log('token - '+ this.userToken);
    console.log('id - '+ this.userId);

    this.linkGrupos = this.linkGrupos + '?user_id=' + this.userId;

    return this.http.get(this.linkGrupos, httpOptions); // {params: {'user_id': this.userId}}, / , httpOptions / ({ user_id: this.userId }) /  {headers, reqBodyObj}
  }
}
