import { Router } from 'express';
import { UserController } from '../controllers/userController.js';

const router = Router();

const user = new UserController()

router.post('/users/new', user.createUser)
router.post('/login', user.login)
export default router;
