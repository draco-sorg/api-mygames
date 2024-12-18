export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  user_image?: string | null;
  biography?: string | null;
}
