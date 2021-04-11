export interface IExternalDocuments {
  results: IExternal[];
  total_records: number;
  total_pages: number;
  page: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface IExternal {
  id: number;
  file_number: string;
  document_state: string;
  register_date: Date;
  end_date: Date;
  name_dependency: string;
  name_document_type: string;
  user_register_name: string;
}
