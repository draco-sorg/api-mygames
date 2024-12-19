import { db } from '../db';
import { ETablesNames } from './../ETablesNames';
import { IUser } from './../../models/users';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (
  user: Omit<IUser, 'id'>
): Promise<String | Error> => {
  try {
    const newUser = {
      ...user,
      id: uuidv4(),
    };
    const [result] = await db(ETablesNames.users)
      .insert(newUser)
      .returning('id');

    if (result) {
      return result.id;
    }

    return new Error('Erro ao cadastrar usuário');
  } catch (error) {
    return new Error('Erro ao cadastrar usuário');
  }
};
