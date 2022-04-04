import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValoracionService } from './provider-valoracion';
import { Valoracion } from './valoracion';
import { Location } from '@angular/common'

@Component({
  selector: 'app-new-valoracion',
  templateUrl: './new-valoracion.component.html',
  providers: [ValoracionService],
  styleUrls: ['./new-valoracion.component.css']
})
export class NewValoracionComponent implements OnInit {
  model = new Valoracion(0,"0","0","0","0","0");
  mensaje:string=""
  idServicio:any;


  constructor(private valService:ValoracionService,public activatedRoute:ActivatedRoute,private location: Location,public router:Router ) { }

  ngOnInit(): void {
    this.idServicio=Number(this.activatedRoute.snapshot.paramMap.get('id'))
  }

  onSubmit() { 
    this.add(Number(this.model.limpieza),Number(this.model.simpatia),Number(this.model.calidad_precio),Number(this.model.sabor),Number(this.model.diseno));
     
  }
  add(
      limpieza_: number,
      simpatia_:number,
      calidad_precio_:number,
      sabor_:number,
      diseno_:number): void {

    if (limpieza_==null || simpatia_==null || sabor_==null || calidad_precio_==null || diseno_==null) {  this.mensaje="Califique todas las categorias por favor"; return }
    if (limpieza_<0 || simpatia_<0 || calidad_precio_<0 || sabor_<0 || diseno_<0) {  this.mensaje="Los valores deben ser mayores a 0"; return }
    if (limpieza_>10 || simpatia_>10 || calidad_precio_>10 || sabor_>10 || diseno_>10) {  this.mensaje="Los valores deben ser menores a 10"; return }
  
      
    // The server will generate the id 
    const newValoracion: Valoracion = {
      limpieza: limpieza_.toString(),
      simpatia: simpatia_.toString(),
      calidad_precio: calidad_precio_.toString(),
      sabor: sabor_.toString(),
      diseno: diseno_.toString(),
    } as Valoracion;
  
  
    this.valService.addValoracion(newValoracion, this.idServicio)
    .subscribe(  (res) => {
        console.log(res);
        this.model = new Valoracion(0,"0","0","0","0","0");
        this.mensaje="Valoracion agregada";
      }, err =>{if(err.status==401) this.router.navigate(['/'])
        this.mensaje="Ya calificaste este servicio";return});
    }
    back(): void {
      this.location.back()
    }

}
