export class PerformanceDependencies {
  public name_dependency?: number;
  public yes?: string;
  public no: string;

  constructor(name_dependency, yes, no) {
    this.name_dependency = name_dependency;
    this.yes = yes;
    this.no = no;
  }
}
