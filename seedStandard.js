const mongoose = require("mongoose");
const Standard = require("./src/models/Standard"); // adjust path if needed

mongoose.connect("mongodb+srv://adinakhalid99_db_user:4xm8yYPZeIDk5W9T@cluster0.k9ltlup.mongodb.net/proj_Backend?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const standards = [
  {
    slug: "pmbok7",
    title: "PMBOK Guide 7th Edition",
    version: "2021",
    meta: {
      publisher: "PMI",
      year: "2021",
      domain: "Project Management",
      country: "USA",
      keyConcepts: [
        "Value Delivery System",
        "Tailoring",
        "Performance Domains",
        "Principles-Based Framework",
      ],
    },
    sections: [
      {
        id: "1",
        title: "Introduction to PMBOK Guide",
        text: "The PMBOK Guide provides a principles-based approach focusing on value delivery and tailoring to specific project contexts.",
        page: 1,
        subsections: [
          {
            id: "1.1",
            title: "Purpose of the Guide",
            text: "Defines the standard for project management and its relationship to value delivery in organizations.",
            page: 2
          },
          {
            id: "1.2",
            title: "What is Project Management",
            text: "The application of knowledge, skills, tools, and techniques to project activities to meet project requirements.",
            page: 3
          }
        ],
      },
      {
        id: "2",
        title: "Project Management Principles",
        text: "Twelve principles that guide the behavior of project management practitioners.",
        page: 15,
        subsections: [
          {
            id: "2.1",
            title: "Stewardship",
            text: "Be a diligent, respectful, and caring steward of resources and the environment.",
            page: 16
          },
          {
            id: "2.2",
            title: "Team",
            text: "Build a culture of accountability and respect among team members.",
            page: 18
          },
          {
            id: "2.3",
            title: "Stakeholders",
            text: "Engage stakeholders proactively and continuously throughout the project.",
            page: 20
          },
          {
            id: "2.4",
            title: "Value",
            text: "Focus on delivering value and benefits to organizations and stakeholders.",
            page: 22
          }
        ],
      },
      {
        id: "3",
        title: "Performance Domains",
        text: "Eight interconnected performance domains that are critical for delivering project outcomes.",
        page: 35,
        subsections: [
          { 
            id: "3.1", 
            title: "Stakeholder Performance Domain", 
            text: "Effective engagement and communication with stakeholders throughout project lifecycle.",
            page: 36
          },
          { 
            id: "3.2", 
            title: "Team Performance Domain", 
            text: "Focus on developing and sustaining high-performing teams and collaboration.",
            page: 40
          },
          { 
            id: "3.3", 
            title: "Development Approach and Life Cycle Performance Domain", 
            text: "Selecting and adapting development approaches and life cycles.",
            page: 45
          },
          { 
            id: "3.4", 
            title: "Planning Performance Domain", 
            text: "Iterative planning processes that enable adaptability and responsiveness.",
            page: 50
          },
          { 
            id: "3.5", 
            title: "Project Work Performance Domain", 
            text: "Coordinating and performing project work to deliver expected outcomes.",
            page: 55
          }
        ],
      },
      {
        id: "4",
        title: "Tailoring",
        text: "Adapting project management approaches to suit the specific context and needs of the project.",
        page: 65,
        subsections: [
          {
            id: "4.1",
            title: "What is Tailoring",
            text: "The deliberate adaptation of project management approach, governance, and processes.",
            page: 66
          },
          {
            id: "4.2",
            title: "Tailoring Considerations",
            text: "Factors to consider when tailoring including project size, complexity, and organizational culture.",
            page: 68
          }
        ],
      }
    ],
  },

  {
    slug: "prince2",
    title: "PRINCE2 7th Edition",
    version: "2023",
    meta: {
      publisher: "Axelos",
      year: "2023",
      domain: "Project Management",
      country: "UK",
      keyConcepts: [
        "Principles, Themes, and Processes",
        "Manage by Stages",
        "Continued Business Justification",
      ],
    },
    sections: [
      {
        id: "1",
        title: "PRINCE2 Principles",
        text: "The seven guiding principles that form the foundation of PRINCE2 methodology.",
        page: 1,
        subsections: [
          { 
            id: "1.1", 
            title: "Continued Business Justification", 
            text: "A PRINCE2 project must have continued business justification that is documented and approved.",
            page: 2
          },
          { 
            id: "1.2", 
            title: "Learn from Experience", 
            text: "PRINCE2 project teams should learn from previous projects and apply those lessons throughout.",
            page: 4
          },
          { 
            id: "1.3", 
            title: "Defined Roles and Responsibilities", 
            text: "Clear accountability and governance structure with defined roles and responsibilities.",
            page: 6
          },
          { 
            id: "1.4", 
            title: "Manage by Stages", 
            text: "PRINCE2 projects are planned, monitored, and controlled on a stage-by-stage basis.",
            page: 8
          },
          { 
            id: "1.5", 
            title: "Manage by Exception", 
            text: "Establishing tolerances for delegation and escalation when tolerances are exceeded.",
            page: 10
          }
        ],
      },
      {
        id: "2",
        title: "PRINCE2 Themes",
        text: "The seven aspects of project management that must be addressed throughout the project.",
        page: 15,
        subsections: [
          { 
            id: "2.1", 
            title: "Business Case Theme", 
            text: "Justifies the project's existence, investment, and ensures it remains desirable, viable, and achievable.",
            page: 16
          },
          { 
            id: "2.2", 
            title: "Organization Theme", 
            text: "Defines project structure, roles, responsibilities, and governance arrangements.",
            page: 20
          },
          { 
            id: "2.3", 
            title: "Quality Theme", 
            text: "Ensures project outputs meet agreed acceptance criteria and are fit for purpose.",
            page: 25
          },
          { 
            id: "2.4", 
            title: "Plans Theme", 
            text: "Provides the framework for designing, developing, and maintaining project plans.",
            page: 30
          },
          { 
            id: "2.5", 
            title: "Risk Theme", 
            text: "Identifies, assesses, and controls uncertainty to improve the likelihood of success.",
            page: 35
          }
        ],
      },
      {
        id: "3",
        title: "PRINCE2 Processes",
        text: "The seven processes that guide the project from start to finish.",
        page: 40,
        subsections: [
          { 
            id: "3.1", 
            title: "Starting Up a Project", 
            text: "Appoint project board and prepare project brief to determine project viability.",
            page: 41
          },
          { 
            id: "3.2", 
            title: "Initiating a Project", 
            text: "Develop Project Initiation Documentation (PID) and establish project control framework.",
            page: 45
          },
          { 
            id: "3.3", 
            title: "Directing a Project", 
            text: "Project board provides direction and decision-making throughout the project.",
            page: 50
          },
          { 
            id: "3.4", 
            title: "Controlling a Stage", 
            text: "Monitor progress, manage issues, and report status to the project board.",
            page: 55
          },
          { 
            id: "3.5", 
            title: "Managing Product Delivery", 
            text: "Team manager coordinates work package delivery and ensures quality standards.",
            page: 60
          }
        ],
      },
      {
        id: "4",
        title: "PRINCE2 in Practice",
        text: "Practical application and tailoring of PRINCE2 methodology.",
        page: 65,
        subsections: [
          {
            id: "4.1",
            title: "Tailoring PRINCE2",
            text: "Adapting PRINCE2 to suit different project environments, sizes, and complexities.",
            page: 66
          },
          {
            id: "4.2",
            title: "PRINCE2 in Agile Environments",
            text: "Integrating PRINCE2 with agile delivery methods for hybrid project management.",
            page: 70
          }
        ],
      }
    ],
  },

  {
    slug: "iso21500",
    title: "ISO 21500:2021 - Guidance on Project Management",
    version: "2021",
    meta: {
      publisher: "International Organization for Standardization",
      year: "2021",
      domain: "Project Management",
      country: "International",
      keyConcepts: [
        "Governance Framework",
        "Alignment with Organizational Strategy",
        "Project, Program, and Portfolio Integration",
      ],
    },
    sections: [
      {
        id: "1",
        title: "Introduction to ISO 21500",
        text: "Provides high-level guidance on managing projects effectively across industries and organizational contexts.",
        page: 1,
        subsections: [
          {
            id: "1.1",
            title: "Scope and Purpose",
            text: "International standard providing guidance on concepts and processes for project management.",
            page: 2
          },
          {
            id: "1.2",
            title: "Target Audience",
            text: "Intended for senior managers, project sponsors, project managers, and project team members.",
            page: 3
          }
        ],
      },
      {
        id: "2",
        title: "Fundamental Concepts",
        text: "Core concepts and principles that underpin effective project management.",
        page: 10,
        subsections: [
          { 
            id: "2.1", 
            title: "Project Governance", 
            text: "Projects operate within a governance framework that aligns with organizational objectives.",
            page: 11
          },
          { 
            id: "2.2", 
            title: "Strategy Alignment", 
            text: "Ensure project objectives support and align with organizational strategy and goals.",
            page: 13
          },
          { 
            id: "2.3", 
            title: "Stakeholder Management", 
            text: "Systematic identification, analysis, and engagement of project stakeholders.",
            page: 15
          },
          { 
            id: "2.4", 
            title: "Project Constraints", 
            text: "Managing competing constraints including scope, time, cost, quality, and risk.",
            page: 17
          }
        ],
      },
      {
        id: "3",
        title: "Project Management Processes",
        text: "Grouping of project management processes into logical categories.",
        page: 25,
        subsections: [
          { 
            id: "3.1", 
            title: "Initiating Process Group", 
            text: "Define project scope, objectives, and obtain authorization to start the project.",
            page: 26
          },
          { 
            id: "3.2", 
            title: "Planning Process Group", 
            text: "Develop project management plans, establish baselines, and define project approach.",
            page: 30
          },
          { 
            id: "3.3", 
            title: "Implementing Process Group", 
            text: "Direct and manage project work, acquire resources, and develop project team.",
            page: 35
          },
          { 
            id: "3.4", 
            title: "Controlling Process Group", 
            text: "Monitor, measure, analyze, and adjust project performance and progress.",
            page: 40
          },
          { 
            id: "3.5", 
            title: "Closing Process Group", 
            text: "Formalize project acceptance, handover deliverables, and close project activities.",
            page: 45
          }
        ],
      },
      {
        id: "4",
        title: "Subject Groups",
        text: "Grouping of related project management subjects and knowledge areas.",
        page: 50,
        subsections: [
          {
            id: "4.1",
            title: "Integration Management",
            text: "Coordinates all project elements and ensures proper coordination.",
            page: 51
          },
          {
            id: "4.2",
            title: "Stakeholder Management",
            text: "Identifies and engages stakeholders to meet their needs and expectations.",
            page: 55
          },
          {
            id: "4.3",
            title: "Scope Management",
            text: "Defines and controls what is included and excluded from the project.",
            page: 60
          },
          {
            id: "4.4",
            title: "Resource Management",
            text: "Identifies, acquires, and manages resources needed for project success.",
            page: 65
          },
          {
            id: "4.5",
            title: "Time Management",
            text: "Plans and controls project schedule to ensure timely completion.",
            page: 70
          }
        ],
      }
    ],
  }
];

async function seed() {
  try {
    console.log("🗑️  Clearing existing standards...");
    await Standard.deleteMany({});
    
    console.log("📥 Inserting new standards...");
    const result = await Standard.insertMany(standards);
    
    console.log("✅ Standards inserted successfully!");
    console.log(`📊 Inserted ${result.length} standards:`);
    
    result.forEach(standard => {
      console.log(`   - ${standard.title} (${standard.sections.length} sections)`);
    });
    
    // Verify the data was inserted correctly
    const count = await Standard.countDocuments();
    console.log(`🔍 Total standards in database: ${count}`);
    
  } catch (err) {
    console.error("❌ Error seeding standards:", err);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Database connection closed.");
  }
}

// Run the seed function
seed();