const Process = require('../models/Process');
const { sendSuccess, sendError } = require('../utils/response');

// CREATE a tailored process
exports.createProcess = async (req, res) => {
  try {
    const { name, description, scenario, phases } = req.body;
    if (!name || !phases) return sendError(res, 400, 'name and phases required');

    const p = new Process({
      name,
      description,
      scenario,
      phases,
      createdBy: req.user?.id
    });
    await p.save();
    sendSuccess(res, 201, p);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// GET a process by ID
exports.getProcess = async (req, res) => {
  try {
    const p = await Process.findById(req.params.id);
    if (!p) return sendError(res, 404, 'Process not found');
    sendSuccess(res, 200, p);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// AUTO-GENERATE process from scenario
exports.generateFromScenario = async (req, res) => {
  try {
    const { scenario } = req.body;
    const phases = [];

    // basic template
    phases.push({
      name: 'Initiation',
      activities: ['Project charter', 'Stakeholder identification'],
      deliverables: ['Project Charter']
    });
    phases.push({
      name: 'Planning',
      activities: ['Scope definition', 'Schedule planning'],
      deliverables: ['Project Management Plan']
    });
    if (scenario?.complexity === 'high') {
      phases.push({
        name: 'Risk Management',
        activities: ['Risk identification', 'Quant analysis'],
        deliverables: ['Risk Register']
      });
    }
    phases.push({
      name: 'Execution',
      activities: ['Team execution', 'Quality Assurance'],
      deliverables: ['Deliverables']
    });
    phases.push({
      name: 'Monitoring & Controlling',
      activities: ['Performance tracking'],
      deliverables: ['Status Reports']
    });
    phases.push({
      name: 'Closing',
      activities: ['Acceptance', 'Lessons Learned'],
      deliverables: ['Final Report']
    });

    const p = new Process({
      name: `Generated - ${Date.now()}`,
      description: 'Auto-generated process',
      scenario,
      phases
    });
    await p.save();
    sendSuccess(res, 201, p);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
