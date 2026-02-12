import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accesibility } from './accesibility';

describe('Accesibility', () => {
  let component: Accesibility;
  let fixture: ComponentFixture<Accesibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accesibility]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accesibility);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
