const mongoose = require('mongoose');

const comparisonSchema = new mongoose.Schema({
  title: { type: String },
  topic: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mappings: [
    {
      standardSlug: String,
      sectionId: String,
      snippet: String
    }
  ],
  insights: {
    similarities: [String],
    differences: [String],
    uniquePoints: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comparison', comparisonSchema);
