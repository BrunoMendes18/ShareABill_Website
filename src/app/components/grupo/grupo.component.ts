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
      this.pedir.sairGrupo().subscribe(arg => {
        console.log(arg);
        localStorage.removeItem('idGrupo');
        this.router.navigate(['/home'])
      })
    }

}
