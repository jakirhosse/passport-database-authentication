import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { sendEmail } from '../utils/sendEmail';
import { CustomError } from '../utils/customError';

export const sendVerificationEmail = async (user: any): Promise<void> => {
  if (user.isVerified) {
    throw new CustomError('User is already verified', 400);
  }

  const verificationToken = jwt.sign({ id: user._id }, process.env.VERIFICATION_TOKEN_SECRET as string, { expiresIn: '1h' });
  const verificationLink = `${process.env.FRONTEND_URL}/verify-account?token=${verificationToken}`;

  await sendEmail(user.email, 'Account Verification', `Verify your account using this link: ${verificationLink}`);
};

export const verifyUserAccount = async (token: string): Promise<void> => {
  let payload;
  try {
    payload = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET as string) as jwt.JwtPayload;
  } catch (err) {
    throw new CustomError('Invalid or expired verification token', 400);
  }

  const user = await User.findById(payload.id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  if (user.isVerified) {
    throw new CustomError('User is already verified', 400);
  }

  user.isVerified = true;
  await user.save();
};
