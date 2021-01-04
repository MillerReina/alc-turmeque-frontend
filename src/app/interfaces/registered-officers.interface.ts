export interface IOfficers {
  results: IRegisteredOfficers[];
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
  roles?: string[];
}
