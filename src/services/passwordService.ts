import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { sendEmail } from '../utils/sendEmail';
import { CustomError } from '../utils/customError';

export const sendPasswordResetLink = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError('User with this email does not exist', 404);
  }

  const resetToken = jwt.sign({ id: user._id }, process.env.RESET_TOKEN_SECRET as string, { expiresIn: '15m' });
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  await sendEmail(email, 'Password Reset', `Reset your password using this link: ${resetLink}`);
};

export const resetUserPassword = async (token: string, newPassword: string): Promise<void> => {
  let payload;
  try {
    payload = jwt.verify(token, process.env.RESET_TOKEN_SECRET as string) as jwt.JwtPayload;
  } catch (err) {
    throw new CustomError('Invalid or expired token', 400);
  }

  const user = await User.findById(payload.id);
  if (!user) {
    throw new CustomError('User not found', 404);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};
