import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalResolvedComponent } from './external-resolved.component';

describe('ExternalResolvedComponent', () => {
  let component: ExternalResolvedComponent;
  let fixture: ComponentFixture<ExternalResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalResolvedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
