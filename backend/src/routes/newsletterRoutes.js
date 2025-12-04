import express from 'express';
import { body } from 'express-validator';
import { subscribe, unsubscribe } from '../controllers/newsletterController.js';

const router = express.Router();

router.post(
  '/',
  [body('email').isEmail().withMessage('Please provide a valid email')],
  subscribe
);

router.post('/unsubscribe', unsubscribe);

export default router;

