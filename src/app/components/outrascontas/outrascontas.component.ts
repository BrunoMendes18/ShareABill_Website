import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-outrascontas',
  templateUrl: './outrascontas.component.html',
  styleUrls: ['./outrascontas.component.css']
})
export class OutrascontasComponent implements OnInit {

  router: Router;
  despesas: any;
  dados: any;
  membrosDesp: any;

  constructor(private pedir: MainService, router: Router) { this.router = router }

  ngOnInit(): void {

    if(!localStorage.getItem("user-token") && !localStorage.getItem("user-id")) {
      this.router.navigate(['/login'])
    }
    else if (!this.pedir.userToken && !this.pedir.userId) {
      this.pedir.userToken = localStorage.getItem("user-token");
      this.pedir.userId = localStorage.getItem("user-id");
      this.pedir.grupoId = localStorage.getItem('idGrupo');
    };

    this.pedir.grupoId = -1;

    this.filtrar()
  }

  filtrar() {

    this.pedir.verDespesasGrupo().subscribe(arg => {
      this.dados = arg;

      for (let i = 0; this.dados.length > i; i++) {
        if(this.dados[i].pago == this.pedir.userId) {
          if (!this.despesas) {
            this.despesas = this.dados[i];
          } else {
            this.despesas = [...this.despesas, ...this.dados[i]]
          }
        } else {
          this.pedir.verMembrosDesp(this.dados[i].id).subscribe(arg => {
            this.membrosDesp = arg;

            for (let j = 0; j < this.membrosDesp.length; j++) {
              if(this.pedir.userId == this.membrosDesp[j].user_id) {
                if (!this.despesas) {
                  this.despesas = this.dados[i];
                } else {
                  this.despesas = [...this.despesas, ...this.dados[i]]
                }
              }
            }
          });
        }
      }
      console.log(this.despesas)
    });
  }

}
