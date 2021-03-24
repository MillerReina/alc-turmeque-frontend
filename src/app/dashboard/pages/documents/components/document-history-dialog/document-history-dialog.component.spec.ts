import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentHistoryDialogComponent } from './document-history-dialog.component';

describe('DocumentHistoryDialogComponent', () => {
  let component: DocumentHistoryDialogComponent;
  let fixture: ComponentFixture<DocumentHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentHistoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
