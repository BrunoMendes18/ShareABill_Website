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
  fromStyle: string = "none";
  addValor: any = 0;
  remValor: any = 0;
  membrosDesp: any;
  deveStyle: string = "none";
  deve: any;
  despesaId: any;

  nome: any;
  desc: any;

  constructor(private pedir: MainService ,router: Router) { this.router = router }

  ngOnInit(): void {
    /* window.onbeforeunload = () => {
      localStorage.removeItem('idGrupo');
      return '';
    }; */

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
      this.nome = this.dadosGrupo[0].nome;
      this.desc = this.dadosGrupo[0].desc;
      console.log(this.dadosGrupo[0].admin);
      console.log(this.pedir.userId)

      console.log(this.dadosGrupo.admin == this.pedir.userId)
      if(this.dadosGrupo[0].admin == this.pedir.userId) {
        this.eliminar = 'block';
      }

    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    });

    this.verDespesasOutros();
    this.adicionarMembros(0);
  }

  verDespesasOutros() {
    this.pedir.verDespesasGrupo().subscribe(arg => {
      this.despesas = arg;
      console.log(this.despesas);

      for (let i = 0; i < this.despesas.length; i++) {

        if(this.despesas[i].pago == this.pedir.userId) {
          this.despesas[i].estado = 'recebe';
        } else {
          this.pedir.verMembrosDesp(this.despesas[i].id).subscribe(argU => {
            console.log('argU')
            console.log(argU)
            this.membrosDesp = argU;

            for (let j = 0; j < this.membrosDesp.length; j++) {
              if(this.membrosDesp[j].user_id == this.pedir.userId) {
                this.despesas[i].estado = 'paga';
                this.despesas[i].deve = this.membrosDesp[j].deve;
              } else {
                this.despesas[i].estado = 'não pertence';
              }
            }
          },(error) => {                              //Error callback
            console.error('error caught in component')
            this.pedir.errorResponse = error;
            this.router.navigate(['/code']);
          })
        }
      }

      console.log(this.despesas);

    });
  }

  liquidar(tipo: any, idDesp: any, deve: any) {
    if (tipo == 'paga') {
      if (this.deveStyle == 'none') {
        this.deveStyle = 'inline-block';

        this.deve = deve;
        this.despesaId = idDesp;

      } else this.deveStyle = 'none';
    } else if (tipo == 'confirmar') {
      console.log('-- dados --')
      console.log(idDesp)
      console.log(deve)
      console.log('-- -- --')
      if(deve <= this.deve && deve > 0) {
        this.pedir.liquidarConta(idDesp, deve).subscribe(arg => {
          console.log(arg);
        },(error) => {                              //Error callback
          console.error('error caught in component')
          this.pedir.errorResponse = error;
          this.router.navigate(['/code']);
        })
      } else {
        alert('Valor Inválido')
      }

    }
  }

  eliminarGrupo() {
    console.log('Oi?')
    this.pedir.eliminarGrupo().subscribe(arg => {
      console.log(arg)
      localStorage.removeItem('idGrupo');
      this.router.navigate(['/home'])
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    });
  }

  sairGrupo() {
      this.pedir.sairGrupo(this.pedir.userId).subscribe(arg => {
        console.log(arg);
        localStorage.removeItem('idGrupo');
        this.router.navigate(['/home'])
      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.pedir.errorResponse = error;
        this.router.navigate(['/code']);
      })
  }

  adicionarMembros(t: any) {
    if(t == 0) {
      this.addValor = 1;
      this.remValor = 0;
      this.usersStyleR = 'none';
      this.usersStyleA = 'block';

    this.pedir.seeAmigos().subscribe(arg => {
      this.dadosAmigos = arg;
      console.log('Adicionar membros');
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    })

    this.pedir.verMembrosGrupo().subscribe(arg => {
      console.log(arg);
      this.dadosUsers = arg
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    })

    this.verUtilizador(+1);
    } else {
      this.usersStyleA = 'none';
      this.addValor = 0;
    }
  }

  removerMembros(t: any) {
    if(t == 0) {
      this.remValor = 1;
      this.addValor = 0;
      this.usersStyleA = 'none';
      this.usersStyleR = 'block';

      this.pedir.verMembrosGrupo().subscribe(arg => {
        console.log(arg);
        this.dadosUsers = arg
        this.verUtilizador(-1);
      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.pedir.errorResponse = error;
        this.router.navigate(['/code']);
      })
    } else {
      this.usersStyleR = 'none';
      this.remValor = 0;
    }
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
              },(error) => {                              //Error callback
                console.error('error caught in component')
                this.pedir.errorResponse = error;
                this.router.navigate(['/code']);
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
            },(error) => {                              //Error callback
              console.error('error caught in component')
              this.pedir.errorResponse = error;
              this.router.navigate(['/code']);
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
          },(error) => {                              //Error callback
            console.error('error caught in component')
            this.pedir.errorResponse = error;
            this.router.navigate(['/code']);
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
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    });
    this.adicionarMembros(0);
  }

  removerMembro(iD: any) {
    this.pedir.sairGrupo(iD).subscribe(arg => {
      console.log('Removido?')
      console.log(arg)
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    });
    this.removerMembros(0);
  }

  atualizarGrupo(tipo: any) {
    console.log(tipo)
    console.log(this.nome)
    console.log(this.desc)
    if(tipo == 0) {
      if(this.fromStyle == 'none') {
        this.fromStyle = 'block';
      } else this.fromStyle = 'none';
    } else {
      this.pedir.atualizarGrupo(this.nome, this.desc).subscribe(arg => {
        console.log(arg);
        this.ngOnInit();
        this.atualizarGrupo(0);
      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.pedir.errorResponse = error;
        this.router.navigate(['/code']);
      })
    }
  }
}
