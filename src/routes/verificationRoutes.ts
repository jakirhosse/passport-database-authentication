import { Router } from 'express';
import { verifyEmail } from '../controllers/verificationController';

const router = Router();

// Email verification route
router.get('/verify-email/:token', verifyEmail);

export default router;
