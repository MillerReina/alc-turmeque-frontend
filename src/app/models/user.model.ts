export class User {
  public dependency?: number;
  public id?: string;
  public firstName: string;
  public lastName: string;
  public typeIdentification?: number;
  public identification: string;
  public username: string;
  public email: string;
  public phoneNumber?: string;
  public birthdate?: string;
  public typeIdentificationName?: string;
  public dependencyName?: string;
  public role?: string[];

  constructor(
    dependency,
    id,
    first_name,
    lastName,
    typeIdentification,
    identification,
    username,
    email,
    phoneNumber,
    birthdate,
    typeIdentificationName,
    dependencyName,
    role
  ) {
    this.dependency = dependency;
    this.id = id;
    this.firstName = first_name;
    this.lastName = lastName;
    this.typeIdentification = typeIdentification;
    this.identification = identification;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.birthdate = birthdate;
    this.typeIdentificationName = typeIdentificationName;
    this.dependencyName = dependencyName;
    this.role = role;
  }
}
