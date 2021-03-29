import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsDocumentsComponent } from './buttons-documents.component';

describe('ButtonsDocumentsComponent', () => {
  let component: ButtonsDocumentsComponent;
  let fixture: ComponentFixture<ButtonsDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonsDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
