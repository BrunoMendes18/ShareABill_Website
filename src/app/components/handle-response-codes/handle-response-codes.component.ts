import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-handle-response-codes',
  templateUrl: './handle-response-codes.component.html',
  styleUrls: ['./handle-response-codes.component.css']
})
export class HandleResponseCodesComponent implements OnInit {

  router: Router;
  dadosErro: any;
  constructor(private pedir : MainService, router : Router) {this.router=router }

  ngOnInit(): void {
    if(this.pedir.errorResponse ==null){
      console.log('nooooo');
    }else{
      this.dadosErro = this.pedir.errorResponse;
    }
  }

}
