import * as yup from 'yup';
import * as bcrypt from 'bcrypt';

import { validation } from '../../middleware';
import { Request, Response } from 'express';
import { UserProvider } from '../../database/providers';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from 'models/errors';
import { IUser } from 'models/users';

interface IBodyProps {
  name?: string;
  email?: string;
  password?: string;
  user_image?: string | null;
  biography?: string | null;
}

export const UpdateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().optional().min(3),
      email: yup.string().optional().email(),
      password: yup.string().optional().min(6).max(20),
      user_image: yup.string().optional(),
      biography: yup.string().optional(),
    })
  ),
}));

export const update = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  const id = req.userId!;
  const data = req.body;

  try {
    if (
      !data.name &&
      !data.email &&
      !data.password &&
      !data.user_image &&
      !data.biography
    ) {
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
    }

    if (data.email) {
      const result = await UserProvider.getUserByEmail(data.email);

      if (!(result as ErrorResponse).type) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: {
            default: 'Email já cadastrado',
          },
        });
      }
    }

    if (data.password) {
      const passwordHash = await bcrypt.hash(data.password, 10);
      data.password = passwordHash;
    }

    const result = await UserProvider.updateUser(id, data);

    if ((result as ErrorResponse).type) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: (result as ErrorResponse).message,
        },
      });
    }

    const { password: _, ...user } = result as IUser;

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Erro interno no servidor',
      },
    });
  }
};
