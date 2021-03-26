import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveDocumentDialogComponent } from './resolve-document-dialog.component';

describe('ResolveDocumentDialogComponent', () => {
  let component: ResolveDocumentDialogComponent;
  let fixture: ComponentFixture<ResolveDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolveDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
