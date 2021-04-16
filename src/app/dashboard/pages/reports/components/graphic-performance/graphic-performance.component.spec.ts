import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicPerformanceComponent } from './graphic-performance.component';

describe('GraphicPerformanceComponent', () => {
  let component: GraphicPerformanceComponent;
  let fixture: ComponentFixture<GraphicPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
