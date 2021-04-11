import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalFinishedComponent } from './external-finished.component';

describe('ExternalFinishedComponent', () => {
  let component: ExternalFinishedComponent;
  let fixture: ComponentFixture<ExternalFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
