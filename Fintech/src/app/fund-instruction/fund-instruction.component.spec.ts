import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundInstructionComponent } from './fund-instruction.component';

describe('FundInstructionComponent', () => {
  let component: FundInstructionComponent;
  let fixture: ComponentFixture<FundInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundInstructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
