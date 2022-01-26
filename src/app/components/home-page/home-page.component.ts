import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  router: Router;
  grupos: any;
  display = "none";
  name: any;
  desc: any;
  idGrupo: any;

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

    this.verGrupos();
  }

  verGrupos() {
    this.pedir.seeGrupos()
    .subscribe(arg => {
      this.grupos = arg;
    });
  }

  verGrupo(id: any) {
    if (id == -1) {
      if (this.display == "none") {
        this.display = "block";
      } else {
        this.display = "none";
      }
    } else if (id == 0) {
      this.router.navigate(['/outrascontas']);
    } else {
      localStorage.setItem('idGrupo', id);
      this.router.navigate(['/grupo']);
    }
  }

  criarGrupo() {
    this.pedir.criarGrupo(this.name, this.desc)
    .subscribe(arg => {
      this.idGrupo = arg;
      this.verGrupos();
    });

  }

  pesquisa(teste: any) {
    if (teste.length >= 3) {
      this.pedir.pesquisarGrupo(teste).subscribe(arg => {
        this.grupos = arg;
      });
    } else {
      this.verGrupos();
    }

  }

}
