export interface IDocumentDetail {
  id: number;
  file_number: string;
  document_type: DocumentType;
  user_register: User;
  user_assign: User;
  dependency: Dependency;
  subject: string;
  register_date: Date;
  working_days: null;
  document_state: string;
  file_document: string;
  sender_first_name: string;
  sender_last_name: string;
  sender_email: string;
  phone_number: string;
  address: string;
  identification_type: number;
  sender_identification: string;
  institution_name: string;
  end_date: string;
}

export interface Dependency {
  id: number;
  name_dependency: string;
  state_dependency: boolean;
}

export interface DocumentType {
  id: number;
  name_document_type: string;
  suggested_working_days: number;
  state_document_type: boolean;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
