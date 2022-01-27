import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  router: Router;
  resultado:any = undefined;
  resultado1:any;
  i:any;
  users:any;
  amigos:any;
  eOuN: any = "falso";
  preresultado:any;

  constructor(private pedir : MainService ,router: Router) { this.router = router }


  ngOnInit(): void {
/*     window.onbeforeunload = () => {
      localStorage.removeItem('user-token');
      return '';
    }; */

    if(!localStorage.getItem("user-token") && !localStorage.getItem("user-id")) {
      this.router.navigate(['/login'])
    } else if (!this.pedir.userToken && !this.pedir.userId) {
      this.pedir.userToken = localStorage.getItem("user-token");
      this.pedir.userId = localStorage.getItem("user-id");
    };

    console.log('OII - ' + this.pedir.userId);

    this.verAmigos();
  }

  verAmigos() {
    if(this.resultado != undefined) {
      this.resultado = undefined;
    }

    this.pedir.seeUsers()
      .subscribe(data => {
      this.users=data;

    this.pedir.seeAmigos()
      .subscribe(data => {
      this.amigos=data;

      for(let i = 0; i < this.users.length; i++) {
        if(this.users[i].id != this.pedir.userId) {
          if(this.amigos.length > 0) {

          console.log('Passou dois ifs')

            for(let j = 0; j < this.amigos.length; j++) {
              if(this.users[i].id == this.amigos[j].user_id1 || this.users[i].id == this.amigos[j].user_id2) {
                this.eOuN = 'verdade';
              }
            }

            if(this.eOuN == 'verdade') {
              this.pedir.verUser(this.users[i].id).subscribe(argU => {
                if(this.resultado == undefined) {
                  this.resultado = argU
                } else {
                  this.preresultado = argU;
                  this.resultado = [...this.resultado, ...this.preresultado]
                }
              })
              this.eOuN = 'falso';
            }

          } else this.resultado.nome = 'Não tem amigos';
        }
      }
    });
    });
  }

  apagarAmigo(id:number) {
    if(confirm('Tens que a certeza que queres remover este amigo?')){
      this.pedir.deleteAmigo(id).subscribe(res=>{
        this.verAmigos();
      })
    }
  }






}
