import { Router } from 'express';
import peopleController from '../controllers/people';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, peopleController.index);
router.get('/:id', loginRequired, peopleController.view);
router.post('/', loginRequired, peopleController.store);
router.put('/:id', loginRequired, peopleController.update);
router.delete('/:id', loginRequired, peopleController.delete);

export default router;

