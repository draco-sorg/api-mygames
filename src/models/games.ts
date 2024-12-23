import { ErrorResponse } from './errors';

export interface IGame {
  id: string;
  steam_id: string;
  name: string;
  synopsis: string;
  achievements: number;
  platforms: string[];
  genres?: string[] | null;
  developer: string;
  release_date?: Date | null;
  image_url?: string[] | null;
}

export type GameWithoutId = Omit<IGame, 'id'>;

export type InsertGameResponse = Promise<IGame | ErrorResponse>;

export type GetGameByIdResponse = InsertGameResponse;

export type getGameBySteamIdResponse = InsertGameResponse;
