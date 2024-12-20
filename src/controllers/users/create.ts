import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { IUser } from 'models/users';
import { validation } from '../../middleware';
import { UserProvider } from '../../database/providers';

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
  const { email } = req.body;

  try {
    const user = await UserProvider.getUserByEmail(email);

    if (!(user instanceof Error)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'Email já cadastrado.',
        },
      });
    }

    const result = await UserProvider.createUser(req.body);

    if (result instanceof Error) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Erro ao cadsatrar usuário!',
      },
    });
  }
};
