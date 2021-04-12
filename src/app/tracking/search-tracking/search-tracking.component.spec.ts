import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrackingComponent } from './search-tracking.component';

describe('SearchTrackingComponent', () => {
  let component: SearchTrackingComponent;
  let fixture: ComponentFixture<SearchTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
