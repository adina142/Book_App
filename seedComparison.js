const mongoose = require('mongoose');
const Comparison = require('./src/models/Comparison'); // Adjust path if needed


mongoose.connect("mongodb+srv://adinakhalid99_db_user:4xm8yYPZeIDk5W9T@cluster0.k9ltlup.mongodb.net/proj_Backend?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// --- Comparison Data ---
const comparisons = [
  {
    title: 'Project Definition Comparison',
    topic: 'Project',
    mappings: [
      {
        standardSlug: 'PMBOK7',
        sectionId: 'Glossary',
        snippet: 'A temporary endeavor undertaken to create a unique product, service, or result.'
      },
      {
        standardSlug: 'PRINCE2-7',
        sectionId: 'Definition',
        snippet: 'A temporary organization created for the purpose of delivering one or more business products according to an agreed Business Case.'
      },
      {
        standardSlug: 'ISO21500',
        sectionId: 'Definition',
        snippet: 'A unique set of processes, consisting of coordinated and controlled activities with start and end dates, performed to achieve objectives.'
      }
    ],
    insights: {
      similarities: ['All describe projects as temporary and goal-oriented efforts.'],
      differences: [
        'PMBOK emphasizes “unique product or result.”',
        'PRINCE2 focuses on “organization” and “business products.”',
        'ISO emphasizes “processes” and “coordinated activities.”'
      ],
      uniquePoints: [
        'ISO introduces “controlled activities.”',
        'PRINCE2 links project directly to Business Case.'
      ]
    }
  },
  {
    title: 'Stakeholder Comparison',
    topic: 'Stakeholders',
    mappings: [
      {
        standardSlug: 'PMBOK7',
        sectionId: 'Stakeholder Domain',
        snippet: 'An individual, group, or organization that may affect, be affected by, or perceive itself to be affected by a decision, activity, or outcome of a project.'
      },
      {
        standardSlug: 'PRINCE2-7',
        sectionId: 'Organization Practice',
        snippet: 'Focuses on three primary project interests: Business, User, and Supplier. Defines stakeholder roles and responsibilities.'
      },
      {
        standardSlug: 'ISO21500',
        sectionId: 'Stakeholder Definition',
        snippet: 'Person, group, or organization that can affect, be affected by, or perceive itself to be affected by a decision, activity, or outcome of a project, programme, or portfolio.'
      }
    ],
    insights: {
      similarities: [
        'All define stakeholders as those who can affect or be affected by the project.'
      ],
      differences: [
        'PMBOK and ISO definitions are nearly identical.',
        'PRINCE2 uses a structured role-based stakeholder model (Business, User, Supplier).'
      ],
      uniquePoints: ['ISO extends the concept to programme and portfolio levels.']
    }
  },
  {
    title: 'Risk Management Comparison',
    topic: 'Risk',
    mappings: [
      {
        standardSlug: 'PMBOK7',
        sectionId: 'Risk Principle',
        snippet: 'An uncertain event or condition that, if it occurs, has a positive or negative effect on one or more project objectives.'
      },
      {
        standardSlug: 'PRINCE2-7',
        sectionId: 'Risk Practice',
        snippet: 'An uncertain event or set of events that, should it occur, will have an effect on the achievement of objectives. Risks can be categorized as threats or opportunities.'
      },
      {
        standardSlug: 'ISO21500',
        sectionId: 'Definition',
        snippet: 'The effect of uncertainty on objectives.'
      }
    ],
    insights: {
      similarities: ['All recognize risk as uncertainty affecting objectives.'],
      differences: [
        'PMBOK and PRINCE2 both specify “positive or negative” effects.',
        'PRINCE2 explicitly uses “threats and opportunities.”'
      ],
      uniquePoints: ['ISO provides the most concise definition, aligning with ISO 31000.']
    }
  },
  {
    title: 'Quality Comparison',
    topic: 'Quality',
    mappings: [
      {
        standardSlug: 'PMBOK7',
        sectionId: 'Quality Domain',
        snippet: 'The degree to which a set of inherent characteristics fulfills requirements.'
      },
      {
        standardSlug: 'PRINCE2-7',
        sectionId: 'Quality Practice',
        snippet: 'Quality Management is the coordinated activities to direct and control an organization with regard to quality. Defines Users’ Quality Expectations and Product Quality Specifications.'
      },
      {
        standardSlug: 'ISO21500',
        sectionId: 'Quality Concept',
        snippet: 'Quality is managed through planning, assurance, and control so that project outcomes meet stakeholder expectations.'
      }
    ],
    insights: {
      similarities: [
        'All stress that quality ensures deliverables meet requirements and stakeholder expectations.'
      ],
      differences: [
        'PMBOK defines quality formally by “degree of characteristics fulfilling requirements.”',
        'PRINCE2 details management practices for quality control and user expectations.',
        'ISO ties quality to assurance and continuous control.'
      ],
      uniquePoints: ['PRINCE2 uniquely introduces “User Quality Expectations.”']
    }
  },
  {
    title: 'Business Justification Comparison',
    topic: 'Business Case / Value',
    mappings: [
      {
        standardSlug: 'PMBOK7',
        sectionId: 'Value Delivery System',
        snippet: 'The Business Case is a documented economic feasibility study used to establish validity of benefits and authorize project management activities.'
      },
      {
        standardSlug: 'PRINCE2-7',
        sectionId: 'Principle',
        snippet: 'Ensure continued business justification — information detailing costs, benefits, and risks to justify running the project.'
      },
      {
        standardSlug: 'ISO21500',
        sectionId: 'Justification Concept',
        snippet: 'Continuous justification confirms expected benefits can be realized and risks managed; outcomes must link to organizational strategy.'
      }
    ],
    insights: {
      similarities: [
        'All highlight the importance of linking project purpose to business value and benefits.'
      ],
      differences: [
        'PRINCE2 treats Business Case as mandatory and continually updated.',
        'PMBOK frames justification as part of value delivery.',
        'ISO treats justification as strategic alignment.'
      ],
      uniquePoints: ['PRINCE2 makes ongoing justification a core principle.']
    }
  },
  {
    title: 'Programme & Portfolio Concepts',
    topic: 'Programme and Portfolio',
    mappings: [
      {
        standardSlug: 'ISO21500',
        sectionId: 'Programme',
        snippet: 'Programme: A group of related projects managed in a coordinated way to achieve benefits not available from managing them individually. Portfolio: A collection of projects, programmes, and operations managed to achieve strategic objectives.'
      },
      {
        standardSlug: 'PMBOK7',
        sectionId: 'Value Delivery Context',
        snippet: 'Projects exist within a larger system that includes programmes and portfolios; these align with organizational strategy and value creation.'
      }
    ],
    insights: {
      similarities: ['Both ISO and PMBOK integrate programme and portfolio into the organizational context.'],
      differences: ['PRINCE2 does not directly cover programme/portfolio management.'],
      uniquePoints: ['ISO explicitly defines both programme and portfolio as formal structures.']
    }
  }
];

// Seed database
const seedDB = async () => {
  try {
    await Comparison.deleteMany({});
    await Comparison.insertMany(comparisons);
    console.log('Comparison seed data inserted successfully.');
  } catch (err) {
    console.error('Error inserting seed data:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
