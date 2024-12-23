import { Router } from 'express';
import { routerLogin } from './routeLogin';
import { authentication } from '../middleware';
import { routerUser } from './routeUsers';
import { routerGames } from './routerGames';
const router = Router();

router.get('/healthy', (req, res) => {
  res.send('Tudo certo!');
});

router.use(routerLogin);
router.use(authentication);
router.use(routerUser);
router.use(routerGames);

export { router };
