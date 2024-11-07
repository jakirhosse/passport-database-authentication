import { Router } from 'express';
import { changePassword, resetPassword } from '../controllers/passwordController';
import { resetPasswordValidation } from '../validations/passwordValidation';
import { validate } from '../middlewares/validateMiddleware';

const router = Router();

// Change password route
router.post('/change-password', changePassword);

// Reset password route
router.post('/reset-password', validate(resetPasswordValidation), resetPassword);

export default router;
