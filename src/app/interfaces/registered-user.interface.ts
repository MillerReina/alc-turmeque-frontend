export interface IUsers {
  results: IRegisteredUser[];
  total_records: number;
  total_pages: number;
  page: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface IRegisteredUser {
  id: number;
  first_name: string;
  last_name: string;
  type_identification: string;
  identification: string;
  email: string;
  phone_number: string;
  address?: string;
}
