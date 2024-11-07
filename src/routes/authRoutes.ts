import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { registerValidation, loginValidation } from '../validations/authValidation';
import { validate } from '../middlewares/validateMiddleware';

const router = Router();

// Register route
router.post('/register', validate(registerValidation), register);

// Login route
router.post('/login', validate(loginValidation), login);

// Logout route (can be customized)
router.post('/logout', logout);

export default router;
