import Newsletter from '../models/Newsletter.js';
import { validationResult } from 'express-validator';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
export const subscribe = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    const existing = await Newsletter.findOne({ email });

    if (existing) {
      if (existing.subscribed) {
        return res.status(400).json({ message: 'Email already subscribed' });
      } else {
        existing.subscribed = true;
        existing.subscribedAt = Date.now();
        await existing.save();
        return res.json({ message: 'Successfully resubscribed to newsletter' });
      }
    }

    await Newsletter.create({ email });
    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email });

    if (!subscription) {
      return res.status(404).json({ message: 'Email not found' });
    }

    subscription.subscribed = false;
    await subscription.save();

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

