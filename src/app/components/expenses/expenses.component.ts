import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {


  nome ="";
  quanti ="";
  tipo = 1;
  grupo_id : any;
  quemPagou : any;

  closepopup :any ;
  popup:any;



  constructor() { }


  ngOnInit(): void {
    this.closepopup =document.getElementById('close');
    this.popup  = document.getElementById('box');
  }

  adicionarDespesa(){
    console.log('despesa');
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
