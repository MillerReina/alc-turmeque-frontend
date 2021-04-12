export interface ITracking {
  sender_first_name: string;
  sender_last_name: string;
  document_state: string;
  sender_identification: string;
  register_date: Date;
  history: IHistory[];
  extensions: IExtension[];
}

export interface IExtension {
  end_date: Date;
}

export interface IHistory {
  action: string;
  register_date: Date;
}
