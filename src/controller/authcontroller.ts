import { Request, Response } from 'express';
import { registerUser, loginUser, logoutUser, changePassword } from '../services/authService';
import { CustomError } from '../utils/customError';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(401).json({ error: error instanceof CustomError ? error.message : 'Unauthorized' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    logoutUser(req.user); // Assuming `req.user` is set by middleware
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await changePassword(req.user, currentPassword, newPassword);
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
