import { createUser, getUserById, getUserByEmail, updateUser } from './users';
import { insertGame } from './games';

export const UserProvider = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
};

export const GameProvider = {
  insertGame,
};
