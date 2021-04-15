import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryOfficersComponent } from './registry-officers.component';

describe('RegistryOfficersComponent', () => {
  let component: RegistryOfficersComponent;
  let fixture: ComponentFixture<RegistryOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryOfficersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
