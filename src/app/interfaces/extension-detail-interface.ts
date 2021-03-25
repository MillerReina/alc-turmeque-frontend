export interface IExtensions {
  extensions: IExtensionDetail[];
}

export interface IExtensionDetail {
  id: number;
  user: User;
  user_solve: null;
  document: Document;
  state_extension: string;
  description: string;
  observations: null;
  end_date: Date;
}

export interface Document {
  id: number;
  file_number: string;
  document_type: number;
  user_register: number;
  subject: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
