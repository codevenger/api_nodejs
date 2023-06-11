import { Router } from 'express';
import peopleController from '../controllers/people';
import loginRequired from '../middlewares/loginRequired';
import editRequired from '../middlewares/editRequired';

const router = new Router();

router.get('/', loginRequired, peopleController.index);
router.get('/:id', loginRequired, peopleController.view);
router.post('/', loginRequired, editRequired, peopleController.store);
router.put('/:id', loginRequired, editRequired, peopleController.update);
router.delete('/:id', loginRequired, editRequired, peopleController.delete);

export default router;
