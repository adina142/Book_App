const mongoose = require('mongoose');

// Recursive section schema for deep linking into standard documents
const SectionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // e.g. "5.2.1"
  title: { type: String, required: true },
  text: { type: String },
  subsections: [this],  // recursion for nesting
  fileRef: { type: String }, // optional link to PDF/EPUB
  page: { type: Number }
});

const standardSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true }, // pmbok, prince2, iso21500
  title: { type: String, required: true },
  version: { type: String },
  meta: { type: Object },
  sections: [SectionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Standard', standardSchema);
