import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = ""
  router: Router;

  resultado : any;

  constructor(private pedir : MainService, router : Router) { this.router = router; }

  logIn() {
    this.pedir.doLogIn(this.email, this.password)
    .subscribe(arg => {
      this.resultado = arg;
      console.log(this.resultado);

      this.pedir.userToken = this.resultado.token;
      this.pedir.userId = this.resultado.id;
      //this.pedir.userId = this.resultado.id;
      console.log('User Token: ',this.pedir.userToken);

      this.saveToken(this.pedir.userToken, this.resultado.id);

      if(!this.resultado.token) {
        alert('Erro no login, informações inválidas');
      }
      else {
        this.router.navigate(['/home']);
      }
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    })
  }

  saveToken(token:any, id:any)
  {
    localStorage.setItem("user-token",token);
    localStorage.setItem("user-id",id);
    console.log('salvei cookie');
  }

  ngOnInit(): void {
  }

}
