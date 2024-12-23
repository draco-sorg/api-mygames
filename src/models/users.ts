import { ErrorResponse } from './errors';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  user_image?: string | null;
  biography?: string | null;
}

export type CreateUserResponse = Promise<
  Omit<IUser, 'id' | 'password'> | ErrorResponse
>;

export type GetUserResponse = Promise<IUser | ErrorResponse>;

export type UpdateUserResponse = GetUserResponse;

export type UpdateUserInput = Partial<IUser>;
