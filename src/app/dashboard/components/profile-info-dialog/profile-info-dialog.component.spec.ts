import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoDialogComponent } from './profile-info-dialog.component';

describe('ProfileInfoDialogComponent', () => {
  let component: ProfileInfoDialogComponent;
  let fixture: ComponentFixture<ProfileInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
