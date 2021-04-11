import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalTableComponent } from './external-table.component';

describe('ExternalTableComponent', () => {
  let component: ExternalTableComponent;
  let fixture: ComponentFixture<ExternalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
