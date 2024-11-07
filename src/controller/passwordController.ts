import { Request, Response } from 'express';
import { sendPasswordResetLink, resetUserPassword } from '../services/passwordService';
import { CustomError } from '../utils/customError';

export const sendResetLink = async (req: Request, res: Response) => {
  try {
    await sendPasswordResetLink(req.body.email);
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(400).json({ error: error instanceof CustomError ? error.message : 'Bad Request' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await resetUserPassword(token, newPassword);
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ error: error instanceof CustomError ? error.message : 'Invalid token or request' });
  }
};
