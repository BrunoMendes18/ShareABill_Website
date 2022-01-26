import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private servico : MainService) { }

  ngOnInit(): void {
    this.lerTokens();
  }

  lerTokens()
    {
      if(localStorage.getItem("user-token")==null){
        console.log('no token :( ');
      }else{
        let token = localStorage.getItem("user-token");
        this.servico.userToken = token;
        let userId = localStorage.getItem("user-id");
        this.servico.userId = userId;
        console.log("Rezar: ",this.servico.userToken);
        console.log("Rezar: ",this.servico.userId);
      }


    }

}
