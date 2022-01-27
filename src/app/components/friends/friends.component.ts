import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  router: Router;
  resultado:any;
  resultado1:any;
  i:any;

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

    console.log('OII - ' + this.pedir.userId);

    this.verAmigos();
  }

  verAmigos() {
    this.pedir.seeAmigos()
    .subscribe(data => {
      this.resultado=data;
      console.log('OI - ')
      console.log(this.resultado)
      this.verUsers()


    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    });
  }

  verUsers() {
    this.pedir.seeUsers()
    .subscribe(data => {
      this.resultado1=data;
      console.log(this.resultado1)
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    });
  }

  apagarAmigo(id:number) {
    if(confirm('Tens que a certeza que queres remover este amigo?')){
      this.pedir.deleteAmigo(id).subscribe(res=>{
        this.verAmigos();
        console.log(id)
      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.pedir.errorResponse = error;
        this.router.navigate(['/code']);
      })
    }
  }






}
