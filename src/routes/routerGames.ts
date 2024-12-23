import { GamesController } from '../controllers';
import { Router } from 'express';
const routerGames = Router();

routerGames.post(
  '/game',
  GamesController.insertValidation,
  GamesController.insert
);

routerGames.get('/game', GamesController.getGame);

export { routerGames };
