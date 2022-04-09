import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleReservaDeMiServicioComponent } from './detalle-reserva-de-mi-servicio.component';

describe('DetalleReservaDeMiServicioComponent', () => {
  let component: DetalleReservaDeMiServicioComponent;
  let fixture: ComponentFixture<DetalleReservaDeMiServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleReservaDeMiServicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleReservaDeMiServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
