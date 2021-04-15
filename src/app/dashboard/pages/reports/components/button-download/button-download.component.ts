import { Component, Input, OnInit } from '@angular/core';
import { ExportToExcelService } from '../../services/export-to-excel.service';

@Component({
  selector: 'app-button-download',
  templateUrl: './button-download.component.html',
  styleUrls: ['./button-download.component.scss'],
})
export class ButtonDownloadComponent implements OnInit {
  /**
   * Documento actual
   */
  @Input() report: [any];
  /**
   * Dependencia actual o todas
   */
  @Input() currentDependencyName: [any];
  /**
   * Año actual
   */
  @Input() currentYear: [any];

  /**
   * Precarga cuando se solicita el comprobante
   */
  public preload: boolean;

  constructor(private exportExcelService: ExportToExcelService) {}

  ngOnInit(): void {}

  /**
   * Descargra excel con los datos
   */
  downloadExcel() {
    this.exportExcelService.exportAsExcelFile(
      this.report,
      `Dependencia_${this.currentDependencyName}-Año_${this.currentYear}`
    );
  }
}
