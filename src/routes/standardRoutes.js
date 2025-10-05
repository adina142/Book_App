const express = require('express');
const router = express.Router();
const {
  uploadStandard,
  getStandard,
  search
} = require('../controllers/standardController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes (only logged-in users can upload)
router.post('/', protect, uploadStandard);

// Public routes
router.get('/:slug', getStandard);
router.get('/', search); // /api/standards?q=risk

module.exports = router;
