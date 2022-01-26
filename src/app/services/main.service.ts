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
  linkDespesas = "api/v1/despesas/"
  linkAmigos = "api/v1/amigos/";
  linkUsers = "api/v1/users/";

  userToken : string | null ="";
  userId: any;
  userId2: any;
  grupoId: any;


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

    const link = this.linkGrupos + this.userId;

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

  deleteAmigo(id:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    return this.http.delete(this.linkAmigos +id , httpOptions);
  }

  AddAmigo(id1:number,id2:number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    const link = this.linkAmigos + '1/' + this.userId + '/' + this.userId2;

    return this.http.post(link, ({ id1:this.userId,id2:this.userId2 }), httpOptions);
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

  pesquisarGrupo(valor: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    const link = this.linkGrupos + '3/' + this.userId + '/' + valor;

    return this.http.get(link, httpOptions);
  }

  pesquisarUser(valor: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    const link = this.linkUsers + valor;

    return this.http.get(link, httpOptions);
  }

  insertDespesav1(name:string ,quantidade: number, tipoo: number,grupoid: number|null , qpago:number)
  {
    console.log('Existe: ',this.userToken);
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    return this.http.post(this.linkDespesas,({nome: name,quanti:quantidade,tipo:tipoo,grupo_id:grupoid,pago:qpago}),httpOptions);
  }

  verGrupo () {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    const link = this.linkGrupos + '2/' + this.grupoId;

    return this.http.get(link, httpOptions);
  }

  verDespesasGrupo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    const link = this.linkDespesas + '2/' + this.grupoId;

    return this.http.get(link, httpOptions);
  }

  sairEliminarGrupo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.userToken,
        'Content-Type': 'application/json; charset=utf-8'
      })
    };

    const link = this.linkGrupos + this.grupoId + '/' + this.userId;

    return this.http.delete(link, httpOptions);
  }
}

