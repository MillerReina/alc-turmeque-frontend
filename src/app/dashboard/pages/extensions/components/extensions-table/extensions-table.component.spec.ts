import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionsTableComponent } from './extensions-table.component';

describe('ExtensionsTableComponent', () => {
  let component: ExtensionsTableComponent;
  let fixture: ComponentFixture<ExtensionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
