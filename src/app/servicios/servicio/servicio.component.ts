import { Component, OnInit } from '@angular/core';
import { ServicioService } from './newServicio/provider-service';
import { Router } from '@angular/router';
import { Service } from './newServicio/service';
import { UsersService } from 'src/app/users/user.service';

@Component({
  selector: 'servicios',
  templateUrl: './servicio.component.html',
  providers: [ ServicioService ],
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

    visibleFormularioEdit: boolean = false;
    servicios: Service[] = [];
    model= new Service(0," "," "," "," "," "," "," "," ");
    mensaje:string=""
 
    constructor(private serService: ServicioService, public router: Router,public userService:UsersService ) { }
  
    ngOnInit(): void {
      this.getServices(+(this.userService.getToken().split("-",1)[0]));
    }

    get diagnostic() { return JSON.stringify(this.model); }

    getServices(id: number
       ): void {

      this.serService.getServiciosOfUser(id.toString())
      .subscribe(servicios => 
        {
          servicios.forEach(servicio => {
              this.servicios.push(servicio);
          })
        }
      );
    }


    editarServicio(servicio:Service):void{
        if(this.visibleFormularioEdit==true){
          if(this.model==servicio)
            this.visibleFormularioEdit=false
        }
        else  
            this.visibleFormularioEdit=true;
        this.model=servicio;
    }

    

    borrarServicio(servicio:Service):void{
      if(confirm('¿Estas seguro que quieres borrar el servicio?')){
          this.serService.deleteServicePaso1(servicio) 
            .subscribe( ()=>{ this.serService.deleteServicePaso2(servicio)
                                  .subscribe(resultado=>this.mensaje="Servicio borrado, recargue la pagina para ver los cambios");
                        }
                      );
      };
  }

    cambiarDatos():void{

      this.update(this.model.id,this.model.nombre,this.model.tipo,this.model.descripcion,this.model.url,
        this.model.twitter,this.model.instagram,this.model.whatsapp,this.model.imagenes);
    
    }

    update(id_:number,
          nombre_: string,
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

  
          if (nombre_=="" || tipo_=="" || descripcion_=="" || url_=="" || twitter_=="" || instagram_=="" || whatsapp_=="" || imagenes_=="") {this.mensaje="No puede haber campos vacios"; return; }


        const newServicio: Service = { id:id_,nombre : nombre_,
            tipo:tipo_,
            descripcion:descripcion_,
            url: url_,
            twitter:twitter_,
            instagram:instagram_,
            whatsapp:whatsapp_,
            imagenes:imagenes_ } as Service;
            this.visibleFormularioEdit=false;
            this.serService.updateService(newServicio) 
            .subscribe(
              () => {
                this.model=new Service(0," "," "," "," "," "," "," "," ")
                this.mensaje="Cambios guardados"
              }
             
             );

      }
 

  }
  