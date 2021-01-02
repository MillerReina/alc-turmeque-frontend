export interface IUsers {
  results: IRegisteredUser[];
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
