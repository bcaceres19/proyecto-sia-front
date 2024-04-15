import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaTarjetaComponent } from './vista-tarjeta.component';

describe('VistaTarjetaComponent', () => {
  let component: VistaTarjetaComponent;
  let fixture: ComponentFixture<VistaTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaTarjetaComponent]
    });
    fixture = TestBed.createComponent(VistaTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
