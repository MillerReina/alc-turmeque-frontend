import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeVoucherDialogComponent } from './see-voucher-dialog.component';

describe('SeeVoucherDialogComponent', () => {
  let component: SeeVoucherDialogComponent;
  let fixture: ComponentFixture<SeeVoucherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeVoucherDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeVoucherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
