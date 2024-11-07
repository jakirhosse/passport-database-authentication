import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/userModel';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IUser;
    req.user = decoded; // Attach user information to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
