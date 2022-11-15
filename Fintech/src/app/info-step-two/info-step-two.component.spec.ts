import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStepTwoComponent } from './info-step-two.component';

describe('InfoStepTwoComponent', () => {
  let component: InfoStepTwoComponent;
  let fixture: ComponentFixture<InfoStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStepTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
