import { Request, Response } from 'express';
import { sendVerificationEmail, verifyUserAccount } from '../services/verificationService';
import { CustomError } from '../utils/customError';

export const sendVerification = async (req: Request, res: Response) => {
  try {
    await sendVerificationEmail(req.user); // Assuming `req.user` is set by middleware
    res.status(200).json({ message: 'Verification email sent' });
  } catch (error) {
    res.status(400).json({ error: error instanceof CustomError ? error.message : 'Unable to send verification email' });
  }
};

export const verifyAccount = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    await verifyUserAccount(token as string);
    res.status(200).json({ message: 'Account verified successfully' });
  } catch (error) {
    res.status(400).json({ error: error instanceof CustomError ? error.message : 'Invalid or expired token' });
  }
};
