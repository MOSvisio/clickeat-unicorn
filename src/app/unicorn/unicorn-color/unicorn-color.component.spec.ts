import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnicornColorComponent } from './unicorn-color.component';

describe('UnicornColorComponent', () => {
  let component: UnicornColorComponent;
  let fixture: ComponentFixture<UnicornColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnicornColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnicornColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
