export interface INotifications {
  notifications: INotification[];
}

export interface INotification {
  id: number;
  document: number;
  description: string;
  register_date: Date;
}
