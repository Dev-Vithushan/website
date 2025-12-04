import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products.product');

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [{ product: productId }]
      });
    } else {
      // Check if product already in wishlist
      const existingProduct = wishlist.products.find(
        item => item.product.toString() === productId
      );

      if (existingProduct) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }

      wishlist.products.push({ product: productId });
      await wishlist.save();
    }

    await wishlist.populate('products.product');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    wishlist.products = wishlist.products.filter(
      item => item.product.toString() !== req.params.productId
    );

    await wishlist.save();
    await wishlist.populate('products.product');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

