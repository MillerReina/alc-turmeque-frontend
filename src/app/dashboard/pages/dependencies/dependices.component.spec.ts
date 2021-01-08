import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependicesComponent } from './dependices.component';

describe('DependicesComponent', () => {
  let component: DependicesComponent;
  let fixture: ComponentFixture<DependicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
