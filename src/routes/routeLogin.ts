import { LoginProvider, UsersController } from '../controllers';
import { Router } from 'express';
const routerLogin = Router();

routerLogin.post(
  '/cadastrar',
  UsersController.createValidation,
  UsersController.create
);
routerLogin.post('/login', LoginProvider.loginValidation, LoginProvider.login);

export { routerLogin };
