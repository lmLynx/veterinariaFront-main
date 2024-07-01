import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesformComponent } from './clientesform.component';

describe('ClientesformComponent', () => {
  let component: ClientesformComponent;
  let fixture: ComponentFixture<ClientesformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesformComponent]
    });
    fixture = TestBed.createComponent(ClientesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
