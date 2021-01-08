import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDependencyComponent } from './create-dependency.component';

describe('CreateDependencyComponent', () => {
  let component: CreateDependencyComponent;
  let fixture: ComponentFixture<CreateDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDependencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
