import { UsersController } from '../controllers';
import { Router } from 'express';
const router = Router();

router.get('/healthy', (req, res) => {
  res.send('Tudo certo!');
});

router.post('/user', UsersController.createValidation, UsersController.create);

export { router };
