import { Component, OnInit, Inject } from '@angular/core';
import { ExtensionsService } from '../../../../services/extensions.service';
import { IDocumentDetail } from '../../../../../interfaces/document-detail-interface';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { ToastMessageService } from '../../../../../services/toast-message.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  public actualDocument: IDocumentDetail;

  constructor(
    private toastService: ToastMessageService,
    private extensionService: ExtensionsService,
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: IDocumentDetail
  ) {
    this.actualDocument = data;
  }

  ngOnInit(): void {}

  approveExtension() {
    this.extensionService.approveExtension(this.actualDocument.extension.id).subscribe((res) => {
      this.toastService.showSuccessMessage('PRÓRROGA APROBADA', res.message);
      this.snackBarRef.dismiss();
    });
  }
}
