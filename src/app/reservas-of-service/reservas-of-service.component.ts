import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../reservas/provider-reserva';
import { ServicioService } from '../servicios/servicio/newServicio/provider-service';

@Component({
  selector: 'app-reservas-of-service',
  templateUrl: './reservas-of-service.component.html',
  providers: [ ServicioService, ReservaService ],
  styleUrls: ['./reservas-of-service.component.css']
})
export class ReservasOfServiceComponent implements OnInit {
  mensaje:string=""
  servicio:any;
  id:any;
  reservas:any[]=[];
  estados:any[]=[];
  formaPagos:any[]=[];

  constructor(private route: ActivatedRoute,private serService: ServicioService,private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.serService.getServiceById(this.id).subscribe(data =>{
      this.servicio=data
      this.serService.getReservasforServiceById(this.id).subscribe((reservas: any[]) =>{
        this.reservas=reservas;
      })
    });
  
    this.reservaService.getAllStatus().subscribe((status)=>{
      this.estados=status
    });
    
    this.reservaService.getAllFormaPagos().subscribe((formaPagos)=>{
      this.formaPagos=formaPagos
    });
      

  
   

    
  }

  
  

}
