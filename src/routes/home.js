import { Router } from 'express';
import homeController from '../controllers/home';

const router = new Router();

router.get('/', homeController.index);
router.post('/login', homeController.login);
router.get('/logout', homeController.logout);
router.post('/logout', homeController.logout);

export default router;
