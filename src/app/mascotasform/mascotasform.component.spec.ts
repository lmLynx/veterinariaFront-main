import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasformComponent } from './mascotasform.component';

describe('MascotasformComponent', () => {
  let component: MascotasformComponent;
  let fixture: ComponentFixture<MascotasformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MascotasformComponent]
    });
    fixture = TestBed.createComponent(MascotasformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
