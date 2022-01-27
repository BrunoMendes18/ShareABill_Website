import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css']
})
export class RegistarComponent implements OnInit {

  name= "";
  email = "";
  password = "";
  router: Router;

  constructor(private pedir : MainService, router : Router) {this.router = router; }

  registar() {
    this.pedir.doRegistar(this.name,this.email, this.password)
    .subscribe(arg => {
      console.log("registrou" + arg);
      console.log(arg);
      this.router.navigate(['/login']);
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    })
  }

  ngOnInit(): void {
  }

}
