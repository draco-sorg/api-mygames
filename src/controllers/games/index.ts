import * as insert from './insert';
import * as getGameById from './getGameById';

export const GamesController = {
  ...insert,
  ...getGameById,
};
