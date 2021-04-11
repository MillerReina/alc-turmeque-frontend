import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDetailComponent } from './external-detail.component';

describe('ExternalDetailComponent', () => {
  let component: ExternalDetailComponent;
  let fixture: ComponentFixture<ExternalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
