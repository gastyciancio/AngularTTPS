import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDetalleMiReservaComponent } from './ver-detalle-mi-reserva.component';

describe('VerDetalleMiReservaComponent', () => {
  let component: VerDetalleMiReservaComponent;
  let fixture: ComponentFixture<VerDetalleMiReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDetalleMiReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerDetalleMiReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
