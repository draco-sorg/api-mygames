import { LoginProvider, UsersController } from '../controllers';
import { Router } from 'express';
const routerLogin = Router();

routerLogin.post(
  '/user',
  UsersController.createValidation,
  UsersController.create
);
routerLogin.post('/login', LoginProvider.login);

export { routerLogin };
