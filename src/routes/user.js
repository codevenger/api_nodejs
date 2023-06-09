import { Router } from 'express';
import userController from '../controllers/user';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, userController.index);
router.get('/:id', loginRequired, userController.view);
router.post('/', loginRequired, userController.store);
router.put('/:id', loginRequired, userController.update);
router.delete('/:id', loginRequired, userController.delete);

export default router;

