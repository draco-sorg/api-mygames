import { Request, Response } from 'express';
import * as yup from 'yup';
import * as bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { IUser } from 'models/users';
import { validation } from '../../middleware';
import { UserProvider } from '../../database/providers';
import { ErrorResponse } from 'models/errors';

interface IBodyProps extends Omit<IUser, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email(),
      password: yup.string().required().min(6).max(20),
      user_image: yup.string().optional(),
      biography: yup.string().optional(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  const { name, email, password, user_image, biography } = req.body;

  try {
    const result = await UserProvider.getUserByEmail(email);

    if (!(result as ErrorResponse).type) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'Email já cadastrado',
        },
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const data = {
      name,
      email,
      password: passwordHash,
      user_image,
      biography,
    };

    const user = await UserProvider.createUser(data);

    if ((user as ErrorResponse).type) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          Type: (user as ErrorResponse).type,
          Message: (user as ErrorResponse).message,
        },
      });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Erro ao cadsatrar usuário!',
      },
    });
  }
};
