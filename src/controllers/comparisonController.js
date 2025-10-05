const Comparison = require('../models/Comparison');
const { sendSuccess, sendError } = require('../utils/response');

// CREATE comparison
exports.createComparison = async (req, res) => {
  try {
    const { topic, mappings, insights } = req.body;
    if (!topic || !mappings) return sendError(res, 400, 'topic & mappings required');

    const cmp = new Comparison({
      topic,
      mappings,
      insights,
      createdBy: req.user?.id
    });
    await cmp.save();
    sendSuccess(res, 201, cmp);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// GET by ID
exports.getComparison = async (req, res) => {
  try {
    const cmp = await Comparison.findById(req.params.id).populate('createdBy', 'name email');
    if (!cmp) return sendError(res, 404, 'Comparison not found');
    sendSuccess(res, 200, cmp);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// LIST by topic
exports.listByTopic = async (req, res) => {
  try {
    const topic = req.query.topic;
    const query = topic ? { topic: { $regex: topic, $options: 'i' } } : {};
    const list = await Comparison.find(query).sort({ createdAt: -1 }).limit(50);
    sendSuccess(res, 200, list);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
