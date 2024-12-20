import { Router } from 'express';
import { routerLogin } from './routeLogin';
const router = Router();

router.get('/healthy', (req, res) => {
  res.send('Tudo certo!');
});

router.use(routerLogin);

export { router };
