import { createUser, getUserById, getUserByEmail, updateUser } from './users';
import { getGameById, insertGame, getGameBySteamId } from './games';

export const UserProvider = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
};

export const GameProvider = {
  insertGame,
  getGameById,
  getGameBySteamId,
};
