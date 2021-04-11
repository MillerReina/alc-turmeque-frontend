import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleDocumentsComponent } from './title-documents.component';

describe('TitleDocumentsComponent', () => {
  let component: TitleDocumentsComponent;
  let fixture: ComponentFixture<TitleDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
