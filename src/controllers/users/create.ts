import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { IUser } from 'models/users';
import { validation } from '../../middleware';

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
  let validatedData: IBodyProps | undefined = undefined;

  console.log(req.body);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ Error: 'Não Implementado' });
};
