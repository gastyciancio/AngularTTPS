import { Component, OnInit } from '@angular/core';
import { ServicioService } from './newServicio/provider-service';

@Component({
  selector: 'servicios',
  templateUrl: './servicio.component.html',
  providers: [ ServicioService ],
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
 
    constructor(private serService: ServicioService) { }
  
    ngOnInit(): void {
      this.getServices(1);
    }
  
    
    getServices(id: number
       ): void {

      this.serService.getServiciosOfUser(id.toString())
      .subscribe(servicios => {
          let lista_ul=document.getElementById('listaServicios');
          servicios.forEach(servicio => {
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(servicio.nombre));
            if(lista_ul!=null)
              lista_ul.appendChild(li);
            
          });
        }

        );
      }
    
    
     
  



  
}
