import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciesTableComponent } from './dependencies-table.component';

describe('DependenciesTableComponent', () => {
  let component: DependenciesTableComponent;
  let fixture: ComponentFixture<DependenciesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependenciesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenciesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
