import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../middleware';
import { IGame } from 'models/games';
import { GameProvider } from '../../database/providers';
import { ErrorResponse } from 'models/errors';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends Omit<IGame, 'id'> {}

export const insertValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      steam_id: yup.number().required(),
      name: yup.string().required(),
      synopsis: yup.string().required(),
      achievements: yup.number().required(),
      platforms: yup.array().of(yup.string().required()).required(),
      genres: yup.array().of(yup.string().required()).optional(),
      developer: yup.string().required(),
      release_date: yup.date().optional(),
      image_url: yup.array().of(yup.string().required()).optional(),
    })
  ),
}));

export const insert = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  const data = req.body;
  try {
    const result = await GameProvider.insertGame(data);

    if ((result as ErrorResponse).type) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          Type: (result as ErrorResponse).type,
          Message: (result as ErrorResponse).message,
        },
      });
    }

    const { id: _, ...game } = result as IGame;

    return res.status(StatusCodes.OK).json(game);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro interno no servidor',
      },
    });
  }
};
