const Process = require('../models/Process');

/**
 * Create a process manually
 */
exports.createProcess = async ({ name, description, scenario, phases, userId }) => {
  const process = new Process({
    name,
    description,
    scenario,
    phases,
    createdBy: userId
  });
  return process.save();
};

/**
 * Get process by ID
 */
exports.getProcessById = async (id) => {
  const process = await Process.findById(id);
  if (!process) throw new Error('Process not found');
  return process;
};

/**
 * Auto-generate process phases from a given scenario
 */
exports.generateProcessFromScenario = async (scenario) => {
  const phases = [];

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

  const process = new Process({
    name: `Generated-${Date.now()}`,
    description: 'Auto-generated process from scenario',
    scenario,
    phases
  });

  return process.save();
};
