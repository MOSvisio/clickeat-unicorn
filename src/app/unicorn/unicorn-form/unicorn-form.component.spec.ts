import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnicornFormComponent } from './unicorn-form.component';

describe('UnicornFormComponent', () => {
  let component: UnicornFormComponent;
  let fixture: ComponentFixture<UnicornFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnicornFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnicornFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
