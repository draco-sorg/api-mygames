/// <reference types="../types/express" />

import { UserProvider } from '../database/providers';
import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { IUser } from 'models/users';

const senha_jwt = process.env.SENHA_JWT!;

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Precisa de autorização!',
      },
    });
  }

  try {
    const token = authorization.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, senha_jwt) as { id: string };

    const user = await UserProvider.getUserById(decoded.id);

    if (user instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'Email e/ou senha invalido',
        },
      });
    }

    req.userId = (user as IUser).id;

    next();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro interno no servidor',
      },
    });
  }
};
