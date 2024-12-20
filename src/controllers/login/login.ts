import { UserProvider } from '../../database/providers';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const senha_jwt = process.env.SENHA_JWT!;

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await UserProvider.getUserByEmail(email);

    if (user instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: user.message,
        },
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(StatusCodes.OK).json({
        errors: {
          default: 'Email e/ou senha invalido',
        },
      });
    }

    const token = jwt.sign({ id: user.id }, senha_jwt, { expiresIn: '2h' });

    const { password: _, ...userLogin } = user;

    return res.status(StatusCodes.OK).json({ userLogin, token });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ Error: 'Erro no servidor' });
  }
};
