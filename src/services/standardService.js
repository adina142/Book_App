const Standard = require('../models/Standard');

/**
 * Create and store a new standard
 */
exports.createStandard = async ({ slug, title, version, sections }) => {
  const existing = await Standard.findOne({ slug });
  if (existing) throw new Error('Standard already exists');
  const std = new Standard({ slug, title, version, sections });
  return std.save();
};

/**
 * Fetch a standard by slug
 */
exports.getStandardBySlug = async (slug) => {
  const std = await Standard.findOne({ slug });
  if (!std) throw new Error('Standard not found');
  return std;
};

/**
 * Search within standards by keyword
 */
exports.searchStandards = async (query) => {
  const q = query || '';
  return Standard.aggregate([
    { $unwind: '$sections' },
    {
      $match: {
        $or: [
          { 'sections.title': { $regex: q, $options: 'i' } },
          { 'sections.text': { $regex: q, $options: 'i' } }
        ]
      }
    },
    { $project: { slug: 1, title: 1, section: '$sections' } },
    { $limit: 200 }
  ]);
};
