import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '../service'
import { ServicioService } from '../provider-service';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common'

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  providers: [ ServicioService ],
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

 model = new Service(0," "," "," "," "," "," "," "," "," "," ");
 mensaje:string=""
 public selectedFile:any=[];
 contadorFotos:number=0;
 previsualizacion:any[]=[];
 @ViewChild('Imagenes1') myInputFileVariable1: ElementRef =new ElementRef("srgsg");
 @ViewChild('Imagenes2') myInputFileVariable2: ElementRef =new ElementRef("srgsg");
 @ViewChild('Imagenes3') myInputFileVariable3: ElementRef =new ElementRef("srgsg");

 constructor(private sanitizer: DomSanitizer,private serService: ServicioService,private location: Location) { }

 onSubmit() { 

  this.add(this.model.nombre,this.model.tipo,this.model.descripcion,this.model.url,
    this.model.twitter,this.model.instagram,this.model.whatsapp);
   
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
      if(this.selectedFile[posicion]==undefined)
        this.contadorFotos=this.contadorFotos+1;
      const archivoCapturado = event.target.files[0]
      this.extraerBase64(archivoCapturado).then((imagen: any) => {
        this.previsualizacion[posicion] = imagen.base;
      })
      this.selectedFile[posicion]=archivoCapturado;
    }
    catch{}
  }
   
  ngOnInit(): void {
  
  }

  clearImage(): any {
    this.previsualizacion = [];
    this.selectedFile = [];
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
        
    let foto1:string="";
    let foto2:string="";
    let foto3:string="";
    if(this.selectedFile[1]!=undefined)
            foto1=this.previsualizacion[1];
    if(this.selectedFile[2]!=undefined)
            foto2=foto2+this.previsualizacion[2];
    if(this.selectedFile[3]!=undefined)
            foto3=this.previsualizacion[3];

    if (nombre_=="" || tipo_=="" || descripcion_=="" || url_=="" || twitter_=="" || instagram_=="" || whatsapp_=="" || (foto1=="" && foto2=="" && foto3=="")) {  this.mensaje="Complete todos los datos por favor"; return }
    if (this.contadorFotos>4) {  this.mensaje="La cantidad de fotos deben ser como maximo 3"; return }
      
    // The server will generate the id 
    const newServicio: Service = {
      nombre: nombre_,
      tipo: tipo_,
      descripcion: descripcion_,
      url: url_,
      twitter: twitter_,
      instagram: instagram_,
      whatsapp: whatsapp_,
      imagen1: foto1,
      imagen2: foto2,
      imagen3: foto3

    } as Service;
    this.selectedFile = [];
    this.contadorFotos=0;
    foto1="";
    foto2="";
    foto3="";
  
    this.serService.addService(newServicio)
    .subscribe(  (res) => {
      console.log("se agrego el servicio");
      console.log(res);
      this.model=new Service(0," "," "," "," "," "," "," "," "," "," ");
      this.mensaje="Servicio agregado";
      this.clearImage()
      this.myInputFileVariable1.nativeElement.value='';
      this.myInputFileVariable2.nativeElement.value='';
      this.myInputFileVariable3.nativeElement.value='';
    });
  }
  back(): void {
    this.location.back()
  }
}
