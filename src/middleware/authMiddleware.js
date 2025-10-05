const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware: Protect routes using JWT
 */
exports.protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }

      next();
    } else {
      res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
  } catch (error) {
    console.error('Auth Error:', error.message);
    res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
  }
};
