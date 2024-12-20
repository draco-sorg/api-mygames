import { UserProvider } from '../database/providers';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const senha_jwt = process.env.SENHA_JWT!;

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return new Error('Precisa de autorização!');
  }

  try {
    const token = authorization.replace('Bearer ', '').trim();
    const decoded = jwt.verify(token, senha_jwt) as { id: string };

    const user = await UserProvider.getUserById(decoded.id);

    if (user instanceof Error) {
      return new Error('Email e/ou senha invalido');
    }

    req.userId = user.id;

    next();
  } catch (error) {}
};
