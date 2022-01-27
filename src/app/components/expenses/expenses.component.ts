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
  grupo_id : number|null= null;
  quemPagou : number=1;

  closepopup :any ;
  popup:any;

  router: Router;

  resultado:any;

  resultadoDespesa:any;

  respostaDelete:any;

  despesas:any;

  nomesDespesas:any ="";
  respostaMembrosDespesa:any;
  membrosDespesas:any = [];

  sideinformation: any ;
  respostaGrupo: any ;
  respostaAmigos: any;

  amigosIds: any = [];

  respostaAmigosInfo: any;
  amigosinfo : any = [];

  errorMessage: any;


  constructor(private pedir : MainService, router : Router) { this.router = router}


  ngOnInit(): void {
    this.closepopup =document.getElementById('close');
    this.popup  = document.getElementById('box');
    this.quemPagou = this.pedir.userId;

    this.verDespesas();
  }
  clearFormData(){
    this.nome ="";
  this.quanti =0;
  this.tipo= 1;
  this.grupo_id= null;
  this.nomesDespesas = "";
  this.quemPagou= this.pedir.userId;
  }

  adicionarDespesa(){
    console.log('despesa');
    this.pedir.insertDespesav1(this.nome,this.quanti,this.tipo,this.grupo_id,this.quemPagou).subscribe((arg) =>{

      this.resultadoDespesa = arg;
      console.log('--------------');
      console.log(this.resultadoDespesa);
      console.log(this.resultadoDespesa.id);
      this.clearFormData();
      if(this.membrosDespesas.length>=1)
      this.addMembros(this.resultadoDespesa.id,this.resultadoDespesa.quanti,this.resultadoDespesa.tipo);

    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.errorMessage = error;
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    })


    this.closePopup();

  }

  addMembros(despId:number,quanti:number,tipo:number){
    console.log(despId);
  /*  this.membrosDespesas.push({id: Id});*/
    console.log(tipo);

    var valor=0;

  if(tipo==1)
  {
    valor = quanti/(this.membrosDespesas.length+1);
  }

    for(let i=0; i<this.membrosDespesas.length;i++)
    {
        this.pedir.addMembroDespesav1(despId,this.membrosDespesas[i].id,valor).subscribe((arg) =>{

          this.respostaMembrosDespesa = arg;
          console.log(this.respostaMembrosDespesa);

        },(error) => {                              //Error callback
          console.error('error caught in component')
          this.errorMessage = error;
          this.pedir.errorResponse = error;
          this.router.navigate(['/code']);
        })
    }
    this.verDespesas();
  }

  verDespesas(){
    console.log('ver despesa');
    this.pedir.seeDespesav1().subscribe(arg =>{
      this.despesas = arg;
      if(this.despesas.length<1){
        this.despesas = [{id:-1,nome:'Não tem nenhuma despesa ainda',pago:-1,grupo_id: -2,tipo: -1}];
      }
      console.log('heello');
      console.log(arg);
      console.log(this.despesas);
      console.log(this.despesas[0].quanti);
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.errorMessage = error;
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    })
  }

  eleminarDespesas(id_desp:number){
    console.log('eleminar despesa');
    this.pedir.removerDespesav1(id_desp).subscribe(arg =>{
      this.respostaDelete = arg;
      console.log('here23');
      this.verDespesas();
    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.errorMessage = error;
      this.pedir.errorResponse = error;
      this.router.navigate(['/code']);
    })
  }

  verGrupos(){
    console.log('ver grupos');
    this.pedir.seeGrupos().subscribe(arg =>{
      this.respostaGrupo = arg;
      this.sideinformation = this.respostaGrupo;
      console.log(this.respostaGrupo);
    })
  }

  addAmigos(){
    console.log('add-amigos');
    this.pedir.userId2 = 7;
    this.pedir.AddAmigo(6,7).subscribe((arg) =>{

      this.resultado = arg;
      console.log('--------------');
      console.log(this.resultado);

    },(error) => {                              //Error callback
      console.error('error caught in component')
      this.errorMessage = error;
      console.log(this.errorMessage);
      console.log('Error: ',this.errorMessage.error);
      console.log('Message: ',this.errorMessage.message);
      console.log('Status: ',this.errorMessage.status);
    })
  }

 async verAmigos(){
    console.log('ver amigos');
  await this.pedir.seeAmigos().subscribe(arg=>{
      this.respostaAmigos = arg;
      console.log(this.respostaAmigos);
      for(let i=0; i<this.respostaAmigos.length; i++)
      {
        if(this.respostaAmigos[i].user_id1 == this.pedir.userId)
        {
          this.amigosIds.push({id:this.respostaAmigos[i].user_id2});
        }else{
          this.amigosIds.push({id:this.respostaAmigos[i].user_id1});
        }


      }
      console.log('opa');
      console.log(this.amigosIds);
      this.amigosInfo();
    })
    console.log('amigao');

  }

 amigosInfo(){
    console.log('amigos-info');
    console.log(this.amigosIds);
    console.log('length: ',this.amigosIds.length)

    for(let i=0; i<this.amigosIds.length;i++)
    {
      this.pedir.verAmigoInfov1(this.amigosIds[i].id).subscribe((arg) =>{

        this.respostaAmigosInfo = arg;
        console.log('--------------');
        console.log(this.respostaAmigosInfo);
        this.amigosinfo.push({id:this.respostaAmigosInfo[0].id,name:this.respostaAmigosInfo[0].name, email: this.respostaAmigosInfo[0].email});
        console.log(this.amigosinfo);

      },(error) => {                              //Error callback
        console.error('error caught in component')
        this.errorMessage = error;
        console.log(this.errorMessage);
        console.log('Error: ',this.errorMessage.error);
        console.log('Message: ',this.errorMessage.message);
        console.log('Status: ',this.errorMessage.status);
      })

    }
    this.amigosIds = [];
  }

  addGrupoDespesa(id: number){
    console.log("Id do grupo: ",id);
    this.grupo_id = id;
  }

  addAmigoDespesa(Id:number,nome:string){
    console.log("Id do amigo: ",Id);
    this.nomesDespesas += " | " + nome;
    this.membrosDespesas.push({id: Id});
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
