import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTypesTableComponent } from './doc-types-table.component';

describe('DocTypesTableComponent', () => {
  let component: DocTypesTableComponent;
  let fixture: ComponentFixture<DocTypesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocTypesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTypesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
