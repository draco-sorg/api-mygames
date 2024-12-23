import { ETablesNames } from '../ETablesNames';
import { db } from '../db';
import {
  GameWithoutId,
  GetGameByIdResponse,
  InsertGameResponse,
} from 'models/games';
import { v4 as uuidv4 } from 'uuid';

export const insertGame = async (data: GameWithoutId): InsertGameResponse => {
  try {
    const platform = data.platforms.join(', ');
    const genres = data.genres?.join(', ');
    const image_url = data.image_url?.join(', ');
    const game = {
      ...data,
      platforms: platform,
      genres: genres,
      image_url: image_url,
      id: uuidv4(),
    };
    const [result] = await db(ETablesNames.games).insert(game).returning('*');

    if (result) {
      return result;
    }

    return {
      type: 'CREATE',
      message: 'Erro ao cadastrar jogo',
    };
  } catch (error) {
    console.log(error);
    return {
      type: 'INTERNAL_SERVER_ERROR',
      message: 'Error interno no servidor',
    };
  }
};
