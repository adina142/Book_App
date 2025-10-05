const Standard = require('../models/Standard');
const { sendSuccess, sendError } = require('../utils/response');

// UPLOAD a standard
exports.uploadStandard = async (req, res) => {
  try {
    const { slug, title, version, sections } = req.body;
    if (!slug || !sections) return sendError(res, 400, 'slug and sections required');

    const existing = await Standard.findOne({ slug });
    if (existing) return sendError(res, 409, 'Standard already exists');

    const std = new Standard({ slug, title, version, sections });
    await std.save();
    sendSuccess(res, 201, std);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// GET a standard
exports.getStandard = async (req, res) => {
  try {
    const { slug } = req.params;
    const std = await Standard.findOne({ slug });
    if (!std) return sendError(res, 404, 'Standard not found');
    sendSuccess(res, 200, std);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// SEARCH within standards
exports.search = async (req, res) => {
  try {
    const q = req.query.q || '';
    const results = await Standard.aggregate([
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
    sendSuccess(res, 200, results);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
