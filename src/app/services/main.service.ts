import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http : HttpClient) {}

  linkLogin = "/api/auth/signin";
  linkRegistar = "/api/auth/signup";
  linkGrupos = "api/v1/grupo";
  linkAmigos = "api/v1/amigos/";
  linkUsers = "api/v1/users/";

  userToken : string | null ="";
  userId: any;
  user_id1: any;

  doLogIn(email: string, password: string){
    return this.http.post(this.linkLogin, ({email: email, password: password}));
  }

  doRegistar(name: string, email:string, password:string){
    return this.http.post(this.linkRegistar, ({name: name,email: email, password: password}));
  }

  seeGrupos(){
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    const link = this.linkGrupos + '/1/' + this.userId ;

    console.log('EndPoint - '+ link)

    const teste = this.http.get(link, httpOptions);
    console.log('Teste - ' + teste);
    return teste;
  }

  criarGrupo(nome: string, desc: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    const link = this.linkGrupos + '/' + this.userId;

    return this.http.post(link, ({ nome: nome, desc: desc, data: new Date(), admin: this.userId }), httpOptions);
  }
  seeAmigos(){
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    return this.http.get(this.linkAmigos + '/' + this.userId , httpOptions);
  }

  seeUsers(){
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    const link = this.http.get(this.linkUsers, httpOptions);
    return link;
  }
}

