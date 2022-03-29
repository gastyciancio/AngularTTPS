import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estado } from '../reservas/estado';
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

  constructor(private route: ActivatedRoute,private serService: ServicioService,private reservaService: ReservaService,public  http:HttpClient) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.serService.getServiceById(this.id).subscribe(data =>{
      this.servicio=data
      this.serService.getReservasforServiceById(this.id).subscribe((reservas: any[]) =>{
        this.reservas=reservas;
        this.reservas.forEach(reserva => {
          this.reservaService.getStatusOfReserva(reserva.id).subscribe((status)=>{
            this.estados.push(status);
      
          });
          this.reservaService.getFormaPagoOfReserva(reserva.id).subscribe((formaPago)=>{
            this.formaPagos.push(formaPago);
          });
        });
      })
    });
  }

  editarEstado(idEstado:any, estado:any): void{
    const nuevo_estado = new Estado(idEstado,estado);
    this.reservaService.updateStatusOfReserva(idEstado,nuevo_estado).subscribe((data)=>{});

  }

}
