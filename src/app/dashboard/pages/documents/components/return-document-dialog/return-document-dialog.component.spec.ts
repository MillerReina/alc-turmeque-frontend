import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDocumentDialogComponent } from './return-document-dialog.component';

describe('ReturnDocumentDialogComponent', () => {
  let component: ReturnDocumentDialogComponent;
  let fixture: ComponentFixture<ReturnDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
