export class OfficersData {
  public total_records: number;
  public total_pages: number;
  public page: number;
  public has_next: boolean;
  public has_prev: boolean;

  constructor() {
    this.total_records = 0;
    this.total_pages = 0;
    this.page = 0;
    this.has_next = false;
    this.has_prev = false;
  }
}
