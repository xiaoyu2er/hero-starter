import { z } from 'zod';

export const zEmail = z.string().email('Please enter a valid email');
export const zPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters long');
