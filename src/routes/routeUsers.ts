import { UsersController } from '../controllers';
import { Router } from 'express';
const routerUser = Router();

routerUser.post(
  '/user',
  UsersController.UpdateValidation,
  UsersController.update
);
routerUser.get('/user', UsersController.getUserById);

export { routerUser };
