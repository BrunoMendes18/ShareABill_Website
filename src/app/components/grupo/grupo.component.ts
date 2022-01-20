import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {

  router: Router;

  constructor(router: Router) { this.router = router }

  ngOnInit(): void {
    if(!localStorage.getItem('idGrupo')) {
      this.router.navigate(['/home']);
    } else {
      alert('Estás a ver o grupo ' + localStorage.getItem('idGrupo'))
    }
  }

}
