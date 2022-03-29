import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../servicios/servicio/newServicio/provider-service';

@Component({
  selector: 'app-reservas-of-service',
  templateUrl: './reservas-of-service.component.html',
  providers: [ ServicioService ],
  styleUrls: ['./reservas-of-service.component.css']
})
export class ReservasOfServiceComponent implements OnInit {
  mensaje:string=""
  servicio:any;
  id:any;
  reservas:any[]=[];

  constructor(private route: ActivatedRoute,private serService: ServicioService) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.serService.getServiceById(this.id).subscribe(data =>{
      this.servicio=data
      this.serService.getReservasforServiceById(this.id).subscribe((reservas: any[]) =>{
        this.reservas=reservas;
      })
    })
  }
  

}
