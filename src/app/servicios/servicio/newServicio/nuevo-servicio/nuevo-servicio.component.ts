import { Component, OnInit } from '@angular/core';
import { Service } from '../service'
import { ServicioService } from '../provider-service';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  providers: [ ServicioService ],
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

 model = new Service(" "," "," "," "," "," "," "," ");

 onSubmit() { 

  this.add(this.model.nombre,this.model.tipo,this.model.descripcion,this.model.url,
    this.model.twitter,this.model.instagram,this.model.whatsapp,this.model.imagenes);
   
}

 
 get diagnostic() { return JSON.stringify(this.model); }

  constructor(private serService: ServicioService) { }

  ngOnInit(): void {
  }

  
  add(nombre_: string,
      tipo_:string,
      descripcion_:string,
      url_:string,
      twitter_:string,
      instagram_:string,
      whatsapp_:string,
      imagenes_:string): void {

        nombre_ = nombre_.trim();
        tipo_ = tipo_.trim();
        descripcion_ = descripcion_.trim();
        url_ = url_.trim();
        twitter_ = twitter_.trim();
        instagram_ = instagram_.trim();
        whatsapp_ = whatsapp_.trim();
        imagenes_ = imagenes_.trim();

    
    if (nombre_=="" || tipo_=="" || descripcion_=="" || url_=="" || twitter_=="" || instagram_=="" || whatsapp_=="" || imagenes_=="") { return; }

    // The server will generate the id 
    const newServicio: Service = { nombre : nombre_,
      tipo:tipo_,
      descripcion:descripcion_,
      url: url_,
      twitter:twitter_,
      instagram:instagram_,
      whatsapp:whatsapp_,
      imagenes:imagenes_ } as Service;
    this.serService.addService(newServicio)
    .subscribe(resultado=>this.model=new Service(" "," "," "," "," "," "," "," "));

    }
   

}
