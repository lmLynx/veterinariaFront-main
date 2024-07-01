import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetasformComponent } from './recetasform.component';

describe('RecetasformComponent', () => {
  let component: RecetasformComponent;
  let fixture: ComponentFixture<RecetasformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecetasformComponent]
    });
    fixture = TestBed.createComponent(RecetasformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
