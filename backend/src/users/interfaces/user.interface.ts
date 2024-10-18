export interface IUser {
  id: string;
  username: string;
  password?: string;
  email: string;
  isEmailConfirmed?: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
