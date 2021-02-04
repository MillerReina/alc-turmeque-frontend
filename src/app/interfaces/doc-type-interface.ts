export interface IDocTypes {
  documentTypes: IDocType[];
}

export interface IDocType {
  id: number;
  name_document_type: string;
  suggested_working_days: number;
  state_document_type: boolean;
}
