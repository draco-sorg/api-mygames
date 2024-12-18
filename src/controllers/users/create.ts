import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IUser } from 'models/users';

interface IBodyProps extends Omit<IUser, 'id'> {}

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  console.log(req.body);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ Error: 'Não Implementado' });
};
