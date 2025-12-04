import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/auth.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post(
  '/',
  protect,
  admin,
  [
    body('name').notEmpty().withMessage('Product name is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  createProduct
);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;

