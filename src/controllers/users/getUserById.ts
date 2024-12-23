import { UserProvider } from './../../database/providers';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from 'models/errors';
import { IUser } from 'models/users';

export const getUserById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const id = req.userId!;

  const result = await UserProvider.getUserById(id);

  if ((result as ErrorResponse).type) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: (result as ErrorResponse).message,
      },
    });
  }

  const { password: _, ...user } = result as IUser;
  return res.status(StatusCodes.OK).json(user);
};
