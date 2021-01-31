export interface IOfficers {
  results: IRegisteredOfficers[];
  total_records: number;
  total_pages: number;
  page: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface IRegisteredOfficers {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  dependency?: number;
  dependency_name?: string;
  type_identification: string;
  type_identification_name?: string;
  identification: string;
  is_active: boolean;
  name_dependency?: string;
  phone_number?: string;
  birthdate?: string;
  role: number;
  name_role: string;
  address?: string;
}

export interface IOfficer {
  id: number;
  dependency: number;
  dependency_name?: string;
  first_name: string;
  last_name: string;
  type_identification: number;
  identification: string;
  username: string;
  phone_number?: string;
  email: string;
  password?: string;
  password_2?: string;
  birthdate: Date;
  address?: string;
  role: number;
  role_name: string;
}
