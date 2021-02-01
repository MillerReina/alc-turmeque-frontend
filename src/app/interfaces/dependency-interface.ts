export interface IDependencies {
  dependencies: IDepedency[];
}

export interface IDepedency {
  id: number;
  name_dependency: string;
  count: number;
  count_active: number;
  state_dependency: boolean;
  user: string;
}
