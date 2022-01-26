import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  router: Router;
  tipoPagina: any;
  dadosGrupo: any;
  despesas: any;
  eliminar: string = "none";
  usersStyleA: string = "none";
  usersStyleR: string = "none";
  dadosAmigos: any;
  user: any;
  users: any;
  dadosUsers: any;

  constructor(private pedir: MainService ,router: Router) { this.router = router }

  ngOnInit(): void {
    window.onbeforeunload = () => {
      localStorage.removeItem('idGrupo');
      return '';
    };

    this.tipoPagina = localStorage.getItem('idGrupo');

    if(!this.tipoPagina) {
      this.router.navigate(['/home']);
    }
    else if(!localStorage.getItem("user-token") && !localStorage.getItem("user-id")) {
      this.router.navigate(['/login'])
    }
    else if (!this.pedir.userToken && !this.pedir.userId) {
      this.pedir.userToken = localStorage.getItem("user-token");
      this.pedir.userId = localStorage.getItem("user-id");
      this.pedir.grupoId = localStorage.getItem('idGrupo');
    };

    this.pedir.grupoId = this.tipoPagina;

    this.pedir.verGrupo().subscribe(arg => {
      this.dadosGrupo = arg;
      console.log(this.dadosGrupo[0].admin);
      console.log(this.pedir.userId)

      console.log(this.dadosGrupo.admin == this.pedir.userId)
      if(this.dadosGrupo[0].admin == this.pedir.userId) {
        this.eliminar = 'block';
      }

    });

    this.verDespesasOutros();
    this.adicionarMembros();
  }

  verDespesasOutros() {
    this.pedir.verDespesasGrupo().subscribe(arg => {
      console.log(arg);
      this.despesas = arg;
    });
  }

  verDespesa(id: any) {
    console.log('Not Working ' + id);
  }

  eliminarGrupo() {
    this.pedir.eliminarGrupo().subscribe(arg => {
      console.log(arg)
      localStorage.removeItem('idGrupo');
      this.router.navigate(['/home'])
    });
  }

  sairGrupo() {
      this.pedir.sairGrupo(this.pedir.userId).subscribe(arg => {
        console.log(arg);
        localStorage.removeItem('idGrupo');
        this.router.navigate(['/home'])
      })
  }

  adicionarMembros() {
    if(this.usersStyleA == 'none') {
      this.usersStyleR = 'none';
      this.usersStyleA = 'block';
    }

    this.pedir.seeAmigos().subscribe(arg => {
      this.dadosAmigos = arg;
      console.log('Adicionar membros');
    })

    this.pedir.verMembrosGrupo().subscribe(arg => {
      console.log(arg);
      this.dadosUsers = arg
    })

  this.verUtilizador(+1);
  }

  removerMembros() {
    if(this.usersStyleR == 'none') {
      this.usersStyleA = 'none';
      this.usersStyleR = 'block';
    }

    this.pedir.verMembrosGrupo().subscribe(arg => {
      console.log(arg);
      this.dadosUsers = arg
      this.verUtilizador(-1);
    })

    console.log('Remover membros')
  }

  verUtilizador(t: any) {
      this.users = undefined;

    if(t == +1) {

      console.log('this.dadosUsers.length')
      console.log(this.dadosUsers.length)

      const x =this.dadosUsers.length;

      for(let i = 0; this.dadosAmigos.length > 0; i++) {

        let j = 0;
        let pertence = 'Falso';

          if(this.dadosAmigos[i].user_id1 == this.pedir.userId) {

            while (j < x) {

              if (this.dadosAmigos[i].user_id2 == this.dadosUsers[j].user_id) {
                pertence = 'Verdadeiro';
              }

              j++;
            }

            if(pertence == 'Falso') {

              this.pedir.verUser(this.dadosAmigos[i].user_id2).subscribe(argU => {
                if(this.users == undefined) {
                  this.users = argU
                } else {
                  this.user = argU;
                  this.users = [...this.users, ...this.user]
                }
              })

            }

          } else {
            this.pedir.verUser(this.dadosAmigos[i].user_id1).subscribe(argU => {
              if(this.users == undefined) {
                this.users = argU
              } else {
                this.user = argU;
                this.users = [...this.users, ...this.user]
              }
            })
          }
      }
    } else {
      for(let i = 0; this.dadosUsers.length > 0; i++) {
        if (this.dadosUsers[i].user_id != this.pedir.userId) {
          this.pedir.verUser(this.dadosUsers[i].user_id).subscribe(argU => {
            if(this.users == undefined) {
              this.users = argU
            } else {
              this.user = argU;
              this.users = [...this.users, ...this.user]
            }
          })
        }
      }
    }

    console.log(this.users)
  }

  adicionarMembro(iD: any) {
    this.pedir.adicionarMGrupo(iD).subscribe(arg => {
      console.log('Adicionado?')
      console.log(arg)
    });
    this.adicionarMembros();
  }

  removerMembro(iD: any) {
    this.pedir.sairGrupo(iD).subscribe(arg => {
      console.log('Removido?')
      console.log(arg)
    });
    this.removerMembros();
  }

}
