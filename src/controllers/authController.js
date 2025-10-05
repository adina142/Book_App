const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return sendError(res, 400, 'Email already registered');

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN || '7d'
    });

    sendSuccess(res, 201, {
      user: { id: user._id, email: user.email, name: user.name },
      token
    });
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendError(res, 401, 'Invalid credentials');

    const ok = await user.comparePassword(password);
    if (!ok) return sendError(res, 401, 'Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRES_IN || '7d'
    });

    sendSuccess(res, 200, {
      token,
      user: { id: user._id, email: user.email, name: user.name }
    });
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
