import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { IUser } from 'models/users';

interface IBodyProps extends Omit<IUser, 'id'> {}

const bodyValidation: yup.ObjectSchema<IBodyProps> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(6).max(20),
  user_image: yup.string().optional(),
  biography: yup.string().optional(),
});

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
): Promise<any> => {
  let validatedData: IBodyProps | undefined = undefined;

  try {
    validatedData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const ValidationErrors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;

      ValidationErrors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: ValidationErrors,
    });
  }

  console.log(req.body);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ Error: 'Não Implementado' });
};
