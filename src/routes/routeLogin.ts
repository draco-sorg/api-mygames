import { UsersController } from '../controllers';
import { Router } from 'express';
const routerLogin = Router();

routerLogin.post(
  '/user',
  UsersController.createValidation,
  UsersController.create
);

export { routerLogin };
