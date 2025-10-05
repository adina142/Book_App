const express = require('express');
const router = express.Router();
const {
  createProcess,
  getProcess,
  generateFromScenario
} = require('../controllers/processController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes
router.post('/', protect, createProcess);
router.post('/generate', protect, generateFromScenario);

// Public route
router.get('/:id', getProcess);

module.exports = router;
