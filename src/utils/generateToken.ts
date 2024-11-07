import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';

export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
};
