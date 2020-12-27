export class User {
  public dependency?: number;
  public id?: string;
  public first_name: string;
  public last_name: string;
  public type_identification?: number;
  public identification: string;
  public username: string;
  public email: string;
  public phone_number?: string;
  public birthdate?: string;
  public type_identification_name?: string;
  public dependency_name?: string;
  public role?: 'Administrador' | 'Titular' | 'Estándar' | 'Temporal';
}
