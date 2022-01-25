import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {


  nome ="";
  quanti :number =0;
  tipo: number = 1;
  grupo_id : number|null=1;
  quemPagou : number=1;

  closepopup :any ;
  popup:any;

  router: Router;

  resultado:any;

  constructor(private pedir : MainService, router : Router) { this.router = router}


  ngOnInit(): void {
    this.closepopup =document.getElementById('close');
    this.popup  = document.getElementById('box');
  }

  adicionarDespesa(){
    console.log('despesa');
    this.pedir.insertDespesav1(this.nome,this.quanti,this.tipo,this.grupo_id,this.quemPagou).subscribe(arg =>{
      this.resultado = arg;
      console.log(this.resultado);
    })
  }

  teste(){
    /*
    this.overlay.style.display = 'block';
        this.popup.style.display = 'block';*/
        this.popup.className = 'show';
  }

  closePopup()
  {
    console.log('here');
        /*this.overlay.style.display = 'none';
        this.popup.style.display = 'none';*/
        this.popup.className = '';
  }

}
