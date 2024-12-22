import { ErrorResponse } from './errors';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  user_image?: string | null;
  biography?: string | null;
}

export type CreateUserResponse = Omit<IUser, 'id' | 'password'> | ErrorResponse;

export type LoginUserResponse = Omit<IUser, 'password'> | ErrorResponse;

export type UpdateUserResponse = LoginUserResponse;
