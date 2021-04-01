import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeReponsesDialogComponent } from './see-reponses-dialog.component';

describe('SeeReponsesDialogComponent', () => {
  let component: SeeReponsesDialogComponent;
  let fixture: ComponentFixture<SeeReponsesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeReponsesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeReponsesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
