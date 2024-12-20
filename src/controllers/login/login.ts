import { UserProvider } from '../../database/providers';
import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IUser } from 'models/users';
import { validation } from '../../middleware';

const senha_jwt = process.env.SENHA_JWT!;

interface IBodyProps
  extends Omit<IUser, 'id' | 'name' | 'user_image' | 'biography'> {}

export const loginValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(6).max(20),
    })
  ),
}));

export const login = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<any> => {
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
