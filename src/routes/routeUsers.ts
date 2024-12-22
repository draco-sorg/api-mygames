import { UsersController } from '../controllers';
import { Router } from 'express';
const routerUser = Router();

routerUser.get('/user', UsersController.getUserById);

export { routerUser };
