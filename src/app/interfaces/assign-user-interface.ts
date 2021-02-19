export interface IAssignUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface INewAssign {
  name_dependency: string;
  user_name: string;
}
