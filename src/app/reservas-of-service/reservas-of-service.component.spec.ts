import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasOfServiceComponent } from './reservas-of-service.component';

describe('ReservasOfServiceComponent', () => {
  let component: ReservasOfServiceComponent;
  let fixture: ComponentFixture<ReservasOfServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasOfServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
