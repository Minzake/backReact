import { Router } from 'express'
import { UserController } from '../controllers/userController.js'
import passport from '../passport-config.js';

const router = Router();

const user = new UserController()

router.post('/users/new', passport.authenticate('jwt', { session: false }), user.createUser)
router.post('/login', user.login)

export default router;
