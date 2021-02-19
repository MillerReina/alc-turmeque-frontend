import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingDocumentDialogComponent } from './assing-document-dialog.component';

describe('AssingDocumentDialogComponent', () => {
  let component: AssingDocumentDialogComponent;
  let fixture: ComponentFixture<AssingDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssingDocumentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
