import { db } from '../db';
import { ETablesNames } from './../ETablesNames';
import {
  CreateUserResponse,
  GetUserResponse,
  IUser,
  UpdateUserInput,
  UpdateUserResponse,
} from './../../models/users';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (
  user: Omit<IUser, 'id'>
): CreateUserResponse => {
  try {
    const newUser = {
      ...user,
      id: uuidv4(),
    };
    const [result] = await db(ETablesNames.users)
      .insert(newUser)
      .returning(['name', 'email', 'user_image', 'biography']);

    if (result) {
      return result;
    }

    return {
      type: 'CREATE',
      message: 'Erro ao cadastrar usuário',
    };
  } catch (error) {
    return {
      type: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno no servidor',
    };
  }
};

export const getUserById = async (id: string): GetUserResponse => {
  try {
    const [user] = await db(ETablesNames.users).select('*').where('id', id);

    if (user) {
      return user;
    }

    return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };
  } catch (error) {
    return {
      type: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno no servidor',
    };
  }
};

export const getUserByEmail = async (email: string): GetUserResponse => {
  try {
    const [user] = await db(ETablesNames.users)
      .select('*')
      .where('email', '=', email);

    if (user) {
      return user;
    }

    return { type: 'USER_NOT_FOUND', message: 'Usuário não encontrado' };
  } catch (error) {
    return {
      type: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno no servidor',
    };
  }
};

export const updateUser = async (
  id: string,
  data: UpdateUserInput
): UpdateUserResponse => {
  try {
    const [result] = await db(ETablesNames.users)
      .update(data)
      .where('id', id)
      .returning('*');

    if (!result)
      return {
        type: 'USER_NOT_FOUND',
        message: 'Usuário não encontrado',
      };

    return result;
  } catch (error) {
    return {
      type: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno no servidor',
    };
  }
};
