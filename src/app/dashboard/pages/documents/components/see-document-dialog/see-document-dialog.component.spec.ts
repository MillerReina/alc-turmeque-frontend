import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDocumentDialogComponent } from './see-document-dialog.component';

describe('SeeDocumentDialogComponent', () => {
  let component: SeeDocumentDialogComponent;
  let fixture: ComponentFixture<SeeDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
