import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStepOneComponent } from './info-step-one.component';

describe('InfoStepOneComponent', () => {
  let component: InfoStepOneComponent;
  let fixture: ComponentFixture<InfoStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStepOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
