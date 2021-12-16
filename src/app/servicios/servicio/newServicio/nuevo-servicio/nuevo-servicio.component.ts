import { Component, OnInit } from '@angular/core';
import { Service } from '../service'
import { ServicioService } from '../provider-service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  providers: [ ServicioService ],
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

 model = new Service(0," "," "," "," "," "," "," "," ");
 mensaje:string=""
 public selectedFile:any=[];
 contadorFotos:number=0;
 

 onSubmit() { 

  this.add(this.model.nombre,this.model.tipo,this.model.descripcion,this.model.url,
    this.model.twitter,this.model.instagram,this.model.whatsapp);
   
}

public processFile(event:any,posicion:number){
  try{
    if(this.selectedFile[posicion]==undefined)
        this.contadorFotos=this.contadorFotos+1;
    this.selectedFile[posicion]=event.target.files[0].name;
    console.log(event.target.files[0]);
    console.log(this.contadorFotos);
   
  }
  catch{}
  finally{
    console.log(this.selectedFile)
  }
}
 
 get diagnostic() { return JSON.stringify(this.model); }

  constructor(private serService: ServicioService,private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  
  add(nombre_: string,
      tipo_:string,
      descripcion_:string,
      url_:string,
      twitter_:string,
      instagram_:string,
      whatsapp_:string): void {

        nombre_ = nombre_.trim();
        tipo_ = tipo_.trim();
        descripcion_ = descripcion_.trim();
        url_ = url_.trim();
        twitter_ = twitter_.trim();
        instagram_ = instagram_.trim();
        whatsapp_ = whatsapp_.trim();
        
    let fotos:string="";
    if(this.selectedFile[1]!=undefined)
            fotos=fotos+this.selectedFile[1]+",";
    if(this.selectedFile[2]!=undefined)
            fotos=fotos+this.selectedFile[2]+",";
    if(this.selectedFile[3]!=undefined)
            fotos=fotos+this.selectedFile[3]+",";

    if (nombre_=="" || tipo_=="" || descripcion_=="" || url_=="" || twitter_=="" || instagram_=="" || whatsapp_=="" || fotos=="" ) {  this.mensaje="Complete todos los datos por favor"; return }
    if (this.contadorFotos>4) {  this.mensaje="La cantidad de fotos deben ser como maximo 3"; return }
      
    // The server will generate the id 
    const newServicio: Service = { nombre : nombre_,
      tipo:tipo_,
      descripcion:descripcion_,
      url: url_,
      twitter:twitter_,
      instagram:instagram_,
      whatsapp:whatsapp_,
      imagenes:fotos} as Service;
    this.selectedFile = [];
    this.contadorFotos=0;
    fotos="";
  
    this.serService.addService(newServicio)
    .subscribe(  (res) => {
      console.log("se agrego el servicio");
      console.log(res);
      this.model=new Service(0," "," "," "," "," "," "," "," ")
      this.mensaje="Servicio agregado"
    });

    }
   

}
