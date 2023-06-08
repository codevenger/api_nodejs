import { Router } from 'express';
import userController from '../controllers/user';

const router = new Router();

router.get('/', userController.index);
router.get('/:id', userController.view);
router.post('/', userController.store);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;

