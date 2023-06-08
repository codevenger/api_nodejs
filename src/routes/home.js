import { Router } from 'express';
import homeController from '../controllers/home';

const router = new Router();

router.get('/', homeController.index);
router.post('/login', homeController.login);

export default router;
