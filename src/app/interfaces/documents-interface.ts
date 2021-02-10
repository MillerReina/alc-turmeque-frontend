export interface IDocuments {
  results: IDocument[];
  total_records: number;
  total_pages: number;
  page: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface IDocument {
  file_number: string;
  document_state: string;
  register_date: Date;
  sender_full_name: string;
  name_dependency: string;
  name_document_type: string;
  user_assign_name: string;
}
