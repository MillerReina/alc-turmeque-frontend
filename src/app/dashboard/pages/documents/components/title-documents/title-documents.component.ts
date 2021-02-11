import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-title-documents',
  templateUrl: './title-documents.component.html',
  styleUrls: ['./title-documents.component.scss'],
})
export class TitleDocumentsComponent implements OnInit {
  /**
   * Input para el titulo
   */
  @Input() titleHeader;
  /**
   * Es administrador
   */
  public isAdmin: boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.isAdmin = this.authService.isAdminConfirmation;
  }

  ngOnInit(): void {}

  generateDocument(): void {
    this.router.navigate([`dashboard/create-doc`]);
  }
}
