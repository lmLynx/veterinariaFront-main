import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasformComponent } from './consultasform.component';

describe('ConsultasformComponent', () => {
  let component: ConsultasformComponent;
  let fixture: ComponentFixture<ConsultasformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultasformComponent]
    });
    fixture = TestBed.createComponent(ConsultasformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
