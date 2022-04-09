import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewValoracionComponent } from './new-valoracion.component';

describe('NewValoracionComponent', () => {
  let component: NewValoracionComponent;
  let fixture: ComponentFixture<NewValoracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewValoracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewValoracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
