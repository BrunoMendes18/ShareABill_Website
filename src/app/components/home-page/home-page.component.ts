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
  grupos:any;

  constructor(private pedir : MainService ,router: Router) { this.router = router }


  ngOnInit(): void {
/*     window.onbeforeunload = () => {
      localStorage.removeItem('user-token');
      return '';
    }; */

    if(!localStorage.getItem("user-token")) {
      this.router.navigate(['/login'])
    }

      this.pedir.seeGrupos()
      .subscribe(arg => {
        this.grupos = arg;
        console.log(arg)
      })

  }

  verGrupo(id: any) {
    localStorage.setItem('idGrupo', id);
    this.router.navigate(['/grupo']);
  }

}
