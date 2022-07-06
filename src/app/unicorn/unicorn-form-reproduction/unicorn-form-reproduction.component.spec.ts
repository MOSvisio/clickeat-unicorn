import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnicornFormReproductionComponent } from './unicorn-form-reproduction.component';

describe('UnicornFormReproductionComponent', () => {
  let component: UnicornFormReproductionComponent;
  let fixture: ComponentFixture<UnicornFormReproductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnicornFormReproductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnicornFormReproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
