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
  resultado:any;
  id:any;
  id1:any;
  id2:any;

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
      this.resultado=data;
      console.log(this.resultado)
    });
  }

  pesquisa(teste: any) {
    if (teste.length >= 3) {
      this.pedir.pesquisarUser(teste).subscribe(arg => {
        this.resultado = arg;
      });
    } else {
      this.verUsers();
    }
  }

  AdicionarAmigo() {
    this.pedir.AddAmigo(this.id1, this.id2)
    .subscribe(arg => {
      this.resultado=arg;
      console.log(this.resultado)
    });

  }

}
