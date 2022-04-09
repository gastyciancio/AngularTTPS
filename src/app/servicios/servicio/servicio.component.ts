import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicioService } from './newServicio/provider-service';
import { Router } from '@angular/router';
import { Service } from './newServicio/service';
import { UsersService } from 'src/app/users/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common'

@Component({
  selector: 'servicios',
  templateUrl: './servicio.component.html',
  providers: [ ServicioService ],
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

    visibleFormularioEdit: boolean = false;
    servicios: Service[] = [];
    model= new Service(0," "," "," "," "," "," "," "," "," "," ");
    mensaje:string=""
    selectedFile: any[]=[];
    previsualizacion:any[]=[];
    fotos1:any[]=[];
    fotos2:any[]=[];
    fotos3:any[]=[];
    posicion:number=0
    @ViewChild('Imagenes1') myInputFileVariable1: ElementRef =new ElementRef("srgsg");
    @ViewChild('Imagenes2') myInputFileVariable2: ElementRef =new ElementRef("srgsg");
    @ViewChild('Imagenes3') myInputFileVariable3: ElementRef =new ElementRef("srgsg");

    constructor(public sanitizer: DomSanitizer,private serService: ServicioService, public router: Router,public userService:UsersService,private location: Location ) { }
   
   
    ngOnInit(): void {
      this.getServices(+(this.userService.getId()));
    }

    back(): void {
      this.location.back()
    }

    getServices(id: number
       ): void {

        this.serService.getServiciosOfUser(id.toString())
        .subscribe(servicios => 
          {
            let pos:number=0;
            servicios.forEach(servicio => {
                this.servicios.push(servicio);
                this.fotos1[pos]=(this.sanitizer.bypassSecurityTrustUrl(servicio.imagen1));
                this.fotos2[pos]=(this.sanitizer.bypassSecurityTrustUrl(servicio.imagen2));
                this.fotos3[pos]=(this.sanitizer.bypassSecurityTrustUrl(servicio.imagen3));
                pos=pos+1;
            })
          },
          err =>{if(err.status==401) this.router.navigate(['/'])});
        
    }

    extraerBase64 = async ($event: any) => new Promise((resolve) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => { 
           resolve({
            base: reader.result
          });
        };
        reader.onerror = error => {
           resolve({
            base: null
          });
        };
        return null;
  
      } catch (e) {
        return null;
      }
    })

    public processFile(event:any,posicion:number){
      try{
        const archivoCapturado = event.target.files[0]
        this.extraerBase64(archivoCapturado).then((imagen: any) => {
          this.previsualizacion[posicion] = imagen.base;
          console.log(imagen);
    
        })
        this.selectedFile[posicion]=archivoCapturado;
      }
      catch{}
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
                                  .subscribe(resultado=>{this.mensaje="Servicio borrado";window.location.reload()},
                                  err =>{if(err.status==401) this.router.navigate(['/'])});
                        },
                        err =>{if(err.status==401) this.router.navigate(['/'])});
                      
      };
  }

    cambiarDatos():void{

      this.update(this.model.id,this.model.nombre,this.model.tipo,this.model.descripcion,this.model.url,
        this.model.twitter,this.model.instagram,this.model.whatsapp);
    
    }

    clearImage(): any {
      this.previsualizacion = [];
      this.selectedFile = [];
    }

    update(id_:number,
          nombre_: string,
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
          
          
          let foto1:string=this.model.imagen1;
          let foto2:string=this.model.imagen2;
          let foto3:string=this.model.imagen3;
          if(this.selectedFile[1]!=undefined)
                  foto1=this.previsualizacion[1];
          if(this.selectedFile[2]!=undefined)
                  foto2=this.previsualizacion[2];
          if(this.selectedFile[3]!=undefined)
                  foto3=this.previsualizacion[3];
  
          if (nombre_=="" || tipo_=="" || descripcion_=="" || url_=="" || twitter_=="" || instagram_=="" || whatsapp_=="" || (foto1=="" && foto2=="" && foto3=="")) {this.mensaje="No puede haber campos vacios"; return; }

          const newServicio: Service = { id:id_,nombre : nombre_,
            tipo:tipo_,
            descripcion:descripcion_,
            url: url_,
            twitter:twitter_,
            instagram:instagram_,
            whatsapp:whatsapp_,
            imagen1: foto1,
            imagen2:foto2,
            imagen3:foto3 } as Service;
            this.visibleFormularioEdit=false;
            this.serService.updateService(newServicio) 
            .subscribe(
              () => {
                this.model=new Service(0," "," "," "," "," "," "," "," "," "," ");
                this.mensaje="Cambios guardados";
                this.clearImage();
                this.myInputFileVariable1.nativeElement.value='';
                this.myInputFileVariable2.nativeElement.value='';
                this.myInputFileVariable3.nativeElement.value='';
              },
              err =>{if(err.status==401) this.router.navigate(['/'])});
             
      }

      verReservas(id:any){
        this.router.navigate(['see_reservas',id]);
      }
  }
  