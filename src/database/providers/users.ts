import { db } from '../db';
import { ETablesNames } from './../ETablesNames';
import { IUser } from './../../models/users';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (
  user: Omit<IUser, 'id'>
): Promise<Omit<IUser, 'id' | 'password'> | Error> => {
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

    return new Error('Erro ao cadastrar usuário');
  } catch (error) {
    return new Error('Erro ao cadastrar usuário');
  }
};

export const getUserById = async (id: string): Promise<IUser | Error> => {
  try {
    const [user] = await db(ETablesNames.users).select('*').where('id', id);

    if (user) {
      return user;
    }

    return new Error('Usuário não encontrado');
  } catch (error) {
    return new Error('Erro no banco de dados');
  }
};

export const getUserByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const [user] = await db(ETablesNames.users)
      .select('*')
      .where('email', '=', email);

    if (user) {
      return user;
    }

    return new Error('Usuário não encontrado');
  } catch (error) {
    return new Error('Erro no banco de dados');
  }
};
