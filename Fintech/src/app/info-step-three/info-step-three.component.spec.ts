import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStepThreeComponent } from './info-step-three.component';

describe('InfoStepThreeComponent', () => {
  let component: InfoStepThreeComponent;
  let fixture: ComponentFixture<InfoStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoStepThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
