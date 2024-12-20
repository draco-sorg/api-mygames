import { UserProvider } from './../../database/providers';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  const result = await UserProvider.getUserById(id);

  if (result instanceof Error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
