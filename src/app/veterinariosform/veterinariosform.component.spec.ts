import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariosformComponent } from './veterinariosform.component';

describe('VeterinariosformComponent', () => {
  let component: VeterinariosformComponent;
  let fixture: ComponentFixture<VeterinariosformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinariosformComponent]
    });
    fixture = TestBed.createComponent(VeterinariosformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
