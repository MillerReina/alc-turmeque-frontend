import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTypesDialogComponent } from './doc-types-dialog.component';

describe('DocTypesDialogComponent', () => {
  let component: DocTypesDialogComponent;
  let fixture: ComponentFixture<DocTypesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocTypesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
