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

}
