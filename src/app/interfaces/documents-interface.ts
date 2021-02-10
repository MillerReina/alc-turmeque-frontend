export interface IDocuments {
  results: IDocument[];
}

export interface IDocument {
  file_number: string;
  document_state: string;
  register_date: string;
  sender_full_name: string;
  name_dependency: string;
  name_document_type: string;
  user_assign_name: string;
}
