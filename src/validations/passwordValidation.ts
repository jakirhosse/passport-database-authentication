import { z } from 'zod';

// Password reset validation schema
export const resetPasswordValidation = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password cannot exceed 20 characters'),
  confirmPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password cannot exceed 20 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});
