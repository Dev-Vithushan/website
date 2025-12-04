import express from 'express';
import { body } from 'express-validator';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updatePassword,
  getMyProfile,
  updateMyProfile
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Profile routes (current user)
router.get('/profile/me', protect, getMyProfile);
router.put(
  '/profile/me',
  protect,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please provide a valid email')
  ],
  updateMyProfile
);

// Password update route
router.put(
  '/:id/password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters')
  ],
  updatePassword
);

// Admin routes
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, getUser);
router.put(
  '/:id',
  protect,
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin')
  ],
  updateUser
);
router.delete('/:id', protect, admin, deleteUser);

export default router;

