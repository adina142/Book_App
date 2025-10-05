const Comparison = require('../models/Comparison');

/**
 * Create a comparison between standards
 */
exports.createComparison = async ({ topic, mappings, insights, userId }) => {
  const cmp = new Comparison({
    topic,
    mappings,
    insights,
    createdBy: userId
  });
  return cmp.save();
};

/**
 * Get a comparison by ID
 */
exports.getComparisonById = async (id) => {
  const cmp = await Comparison.findById(id).populate('createdBy', 'name email');
  if (!cmp) throw new Error('Comparison not found');
  return cmp;
};

/**
 * List comparisons by topic
 */
exports.listComparisons = async (topic) => {
  const query = topic ? { topic: { $regex: topic, $options: 'i' } } : {};
  return Comparison.find(query).sort({ createdAt: -1 }).limit(50);
};

/**
 * Generate insights (basic logic example)
 */
exports.generateInsights = async (mappings) => {
  const similarities = [];
  const differences = [];
  const unique = [];

  mappings.forEach((m) => {
    if (m.pmbok && m.prince2 && m.iso) similarities.push(m);
    else if ((m.pmbok && m.prince2) || (m.pmbok && m.iso) || (m.prince2 && m.iso))
      differences.push(m);
    else unique.push(m);
  });

  return { similarities, differences, unique };
};
