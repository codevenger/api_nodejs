import { Router } from 'express';
import userController from '../controllers/user';
import loginRequired from '../middlewares/loginRequired';
import superRequired from '../middlewares/superRequired';
import editRequired from '../middlewares/editRequired';

const router = new Router();

router.get('/', loginRequired, editRequired, userController.index);
router.get('/:id', loginRequired, editRequired, userController.view);
router.post('/', loginRequired, superRequired, userController.store);
router.put('/:id', loginRequired, superRequired, userController.update);
router.delete('/:id', loginRequired, superRequired, userController.delete);

export default router;

