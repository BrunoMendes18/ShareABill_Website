import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  router: Router;
  tipoPagina: any;

  constructor(router: Router) { this.router = router }

  ngOnInit(): void {
    this.tipoPagina = localStorage.getItem('idGrupo');
    if(!this.tipoPagina) {
      this.router.navigate(['/home']);
    } else {
      alert('Estás a ver o grupo ' + this.tipoPagina)
    }
  }

}
