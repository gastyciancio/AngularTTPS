import { Component, OnInit } from '@angular/core';
import { ValoracionService } from './provider-valoracion';
import { Valoracion } from './valoracion';

@Component({
  selector: 'app-new-valoracion',
  templateUrl: './new-valoracion.component.html',
  providers: [ValoracionService],
  styleUrls: ['./new-valoracion.component.css']
})
export class NewValoracionComponent implements OnInit {
  model = new Valoracion(0,0,0,0,0);
  mensaje:string=""


  constructor(private valService:ValoracionService) { }

  ngOnInit(): void {
  }

  onSubmit() { 
    this.add(this.model.limpieza,this.model.simpatia,this.model.sabor,this.model.diseno);
     
  }
  add(
      limpieza_: number,
      simpatia_:number,
      sabor_:number,
      diseno_:number): void {

    if (limpieza_==null || simpatia_==null || sabor_==null || diseno_==null) {  this.mensaje="Califique todas las categorias por favor"; return }
    if (limpieza_<0 || simpatia_<0 || sabor_<0 || diseno_<0) {  this.mensaje="Los valores deben ser mayores a 0"; return }
    if (limpieza_>10 || simpatia_>10 || sabor_>10 || diseno_>10) {  this.mensaje="Los valores deben ser menores a 10"; return }
  
      
    // The server will generate the id 
    const newValoracion: Valoracion = {
      limpieza: limpieza_,
      simpatia: simpatia_,
      sabor: sabor_,
      diseno: diseno_,
    } as Valoracion;
  
  
    this.valService.addValoracion(newValoracion)
    .subscribe(  (res) => {
      console.log(res);
      this.model = new Valoracion(0,0,0,0,0);
      this.mensaje="Valoracion agregada";
    }, err =>{this.mensaje=err; return});
    }

}
