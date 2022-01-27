import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  router: Router;
  resultado:any = undefined;
  amigos: any;
  users: any;
  preresultado: any;
  eOuN: any = "verdade";

  constructor(private pedir : MainService ,router: Router) { this.router = router }

  ngOnInit(): void {
    if(!localStorage.getItem("user-token") && !localStorage.getItem("user-id")) {
      this.router.navigate(['/login'])
    } else if (!this.pedir.userToken && !this.pedir.userId) {
      this.pedir.userToken = localStorage.getItem("user-token");
      this.pedir.userId = localStorage.getItem("user-id");
    };

    console.log('OII - ' + this.pedir.userId);
    this.verUsers();
  }

  verUsers() {
    this.pedir.seeUsers()
    .subscribe(data => {

      this.users = data;

      this.pedir.seeAmigos().subscribe(arg => {

        this.amigos = arg;

        for (let i = 0; i < this.users.length; i++) {
          if(this.users[i].id != this.pedir.userId) {
            if(this.amigos.length > 0) {

              for (let j = 0; j < this.amigos.length; j++) {
                if(this.users[i].id != this.amigos[j].user_id1 && this.users[i].id != this.amigos[j].user_id2) {
                  this.eOuN = 'false';
                }
              }

              if(this.eOuN == 'false') {
                this.pedir.verUser(this.users[i].id).subscribe(argU => {
                  if(this.resultado == undefined) {
                    this.resultado = argU
                  } else {
                    this.preresultado = argU;
                    this.resultado = [...this.resultado, ...this.preresultado]
                  }
                })
                this.eOuN = 'verdade'
              }

            } else {
                this.pedir.verUser(this.users[i].id).subscribe(argU => {
                  if(this.resultado == undefined) {
                    this.resultado = argU
                  } else {
                    this.preresultado = argU;
                    this.resultado = [...this.resultado, ...this.preresultado]
                  }
                })
            }
          }
        }

      })
    });
  }

  pesquisa(teste: any) {
    if (teste.length >= 3) {
      this.pedir.pesquisarUser(teste).subscribe(arg => {
        this.resultado = arg;
      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.pedir.errorResponse = error;
        this.router.navigate(['/code']);
      });
    } else {
      this.verUsers();
    }
  }

  AdicionarAmigo(id2: any) {
    this.pedir.AddAmigo(this.pedir.userId, id2)
    .subscribe(arg => {
      this.resultado=arg;
      console.log(this.resultado)

      this.ngOnInit();
    });

  }

}
