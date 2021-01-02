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
  type_identification: string;
  identification: string;
  is_active: boolean;
  name_dependency?: string;
}
