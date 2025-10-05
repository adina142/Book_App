const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  scenario: { type: Object }, // e.g. { size: 'small', complexity: 'low', industry: 'IT' }
  phases: [
    {
      name: String,
      activities: [String],
      deliverables: [String],
      references: [
        {
          standardSlug: String,
          sectionId: String
        }
      ]
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Process', processSchema);
