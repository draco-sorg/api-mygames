import { Router } from 'express';
const router = Router();

router.get('/healthy', (req, res) => {
  res.send('Tudo certo!');
});

export { router };
