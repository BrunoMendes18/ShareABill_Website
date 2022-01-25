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

  constructor(private pedir: MainService ,router: Router) { this.router = router }

  ngOnInit(): void {
    this.tipoPagina = localStorage.getItem('idGrupo');

    if(!this.tipoPagina) {
      this.router.navigate(['/home']);
    } else if(!localStorage.getItem("user-token") && !localStorage.getItem("user-id")) {
      this.router.navigate(['/login'])
    } else if (!this.pedir.userToken && !this.pedir.userId) {
      this.pedir.userToken = localStorage.getItem("user-token");
      this.pedir.userId = localStorage.getItem("user-id");
      this.pedir.grupoId = localStorage.getItem('idGrupo');
    };

    this.pedir.verGrupo().subscribe(arg => {
      this.dadosGrupo = arg;
    })

    this.verDespesas();
  }

  verDespesas() {
    this.pedir.verDespesasGrupo().subscribe(arg => {
      console.log(arg);
      this.despesas = arg;
    })
  }

  verDespesa(id: any) {
    console.log('Not Working ' + id);
  }

}
