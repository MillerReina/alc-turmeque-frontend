import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionDocumentDialogComponent } from './extension-document-dialog.component';

describe('ExtensionDocumentDialogComponent', () => {
  let component: ExtensionDocumentDialogComponent;
  let fixture: ComponentFixture<ExtensionDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
