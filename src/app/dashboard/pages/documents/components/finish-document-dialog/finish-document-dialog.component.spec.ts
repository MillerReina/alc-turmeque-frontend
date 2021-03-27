import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishDocumentDialogComponent } from './finish-document-dialog.component';

describe('FinishDocumentDialogComponent', () => {
  let component: FinishDocumentDialogComponent;
  let fixture: ComponentFixture<FinishDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
