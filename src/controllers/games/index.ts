import * as insert from './insert';
import * as getGame from './getGame';

export const GamesController = {
  ...insert,
  ...getGame,
};
