import { GameProvider } from '../../database/providers';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from 'models/errors';

export const getGameById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const game = await GameProvider.getGameById(id);

    if ((game as ErrorResponse).type) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: (game as ErrorResponse).message,
        },
      });
    }

    return res.status(StatusCodes.OK).json(game);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro interno no servidor',
      },
    });
  }
};
