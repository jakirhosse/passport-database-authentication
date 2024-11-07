import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { CustomError } from '../utils/customError';
import { IUser } from '../interfaces/authInterfaces';

export const registerUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError('User already exists', 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  await user.save();
  return user;
};

export const loginUser = async (email: string, password: string): Promise<{ token: string; user: IUser }> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError('Invalid email or password', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new CustomError('Invalid email or password', 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return { token, user };
};

export const logoutUser = (user: IUser): void => {
  // Custom logout logic if needed, such as token invalidation in a database
};

export const changePassword = async (user: IUser, currentPassword: string, newPassword: string): Promise<void> => {
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new CustomError('Current password is incorrect', 400);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};
