const express = require('express');
const router = express.Router();
const {
  createComparison,
  getComparison,
  listByTopic
} = require('../controllers/comparisonController');
const { protect } = require('../middleware/authMiddleware');

// Protected route (create comparison)
router.post('/', protect, createComparison);

// Public routes
router.get('/:id', getComparison);
router.get('/', listByTopic);

module.exports = router;
