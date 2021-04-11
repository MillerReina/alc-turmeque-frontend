import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalInProcessComponent } from './external-in-process.component';

describe('ExternalInProcessComponent', () => {
  let component: ExternalInProcessComponent;
  let fixture: ComponentFixture<ExternalInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalInProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
