const mongoose = require("mongoose");
const Standard = require("./src/models/Standard"); // adjust path if needed

mongoose.connect("mongodb+srv://adinakhalid99_db_user:4xm8yYPZeIDk5W9T@cluster0.k9ltlup.mongodb.net/proj_Backend?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const standards = [
  // =============================
  // 📘 PMBOK 7th Edition
  // =============================
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
        title: "Introduction",
        text: "Defines the standard for project management and introduces the PMBOK Guide structure.",
        page: 1,
        subsections: [
          { id: "1.1", title: "Purpose of the Standard", text: "Outlines the intent and purpose of the PMBOK Standard.", page: 2 },
          { id: "1.2", title: "Key Terms and Concepts", text: "Defines essential terminology for project management.", page: 3 },
          { id: "1.3", title: "Audience for the Standard", text: "Describes who should use this standard.", page: 4 },
        ],
      },
      {
        id: "2",
        title: "A System for Value Delivery",
        text: "Explains the value delivery framework and organizational environment.",
        page: 10,
        subsections: [
          { id: "2.1", title: "Creating Value", text: "How projects create value through outcomes and benefits.", page: 11 },
          { id: "2.2", title: "Organizational Governance Systems", text: "Explains governance, information flow, and oversight.", page: 15 },
          { id: "2.3", title: "Functions Associated with Projects", text: "Outlines various organizational functions supporting projects.", page: 18 },
          { id: "2.4", title: "The Project Environment", text: "Explains internal and external project environments.", page: 25 },
          { id: "2.5", title: "Product Management Considerations", text: "Describes how products relate to project management.", page: 30 },
        ],
      },
      {
        id: "3",
        title: "Project Management Principles",
        text: "The 12 fundamental principles that guide effective project management.",
        page: 35,
        subsections: [
          { id: "3.1", title: "Be a Diligent, Respectful, and Caring Steward", text: "", page: 36 },
          { id: "3.2", title: "Create a Collaborative Project Team Environment", text: "", page: 37 },
          { id: "3.3", title: "Effectively Engage with Stakeholders", text: "", page: 38 },
          { id: "3.4", title: "Focus on Value", text: "", page: 39 },
          { id: "3.5", title: "Recognize, Evaluate, and Respond to System Interactions", text: "", page: 40 },
          { id: "3.6", title: "Demonstrate Leadership Behaviors", text: "", page: 41 },
          { id: "3.7", title: "Tailor Based on Context", text: "", page: 42 },
          { id: "3.8", title: "Build Quality into Processes and Deliverables", text: "", page: 43 },
          { id: "3.9", title: "Navigate Complexity", text: "", page: 44 },
          { id: "3.10", title: "Optimize Risk Responses", text: "", page: 45 },
          { id: "3.11", title: "Embrace Adaptability and Resiliency", text: "", page: 46 },
          { id: "3.12", title: "Enable Change to Achieve the Envisioned Future State", text: "", page: 47 },
        ],
      },
      {
        id: "4",
        title: "Project Performance Domains",
        text: "Eight performance domains essential for project success.",
        page: 50,
        subsections: [
          { id: "4.1", title: "Stakeholder Performance Domain", text: "Stakeholder engagement and analysis.", page: 51 },
          { id: "4.2", title: "Team Performance Domain", text: "Leadership, culture, and collaboration.", page: 52 },
          { id: "4.3", title: "Development Approach and Life Cycle Performance Domain", text: "Development approaches and life cycle selection.", page: 53 },
          { id: "4.4", title: "Planning Performance Domain", text: "Project planning and communication processes.", page: 54 },
          { id: "4.5", title: "Project Work Performance Domain", text: "Coordinating and performing project work.", page: 55 },
          { id: "4.6", title: "Delivery Performance Domain", text: "Deliverables and value realization.", page: 56 },
          { id: "4.7", title: "Measurement Performance Domain", text: "Establishing effective measures and monitoring.", page: 57 },
          { id: "4.8", title: "Uncertainty Performance Domain", text: "Risk, ambiguity, and complexity management.", page: 58 },
        ],
      },
      {
        id: "5",
        title: "Tailoring",
        text: "Adapting methods to fit project context.",
        page: 60,
        subsections: [
          { id: "5.1", title: "Why Tailor?", text: "", page: 61 },
          { id: "5.2", title: "What to Tailor", text: "Life cycle, processes, and engagement methods.", page: 62 },
          { id: "5.3", title: "The Tailoring Process", text: "Steps to adapt methodology.", page: 63 },
        ],
      },
      {
        id: "6",
        title: "Models, Methods, and Artifacts",
        text: "Common tools and artifacts used across performance domains.",
        page: 65,
      },
      {
        id: "7",
        title: "Appendices",
        text: "Supporting materials, glossaries, and references.",
        page: 90,
      },
    ],
  },

  // =============================
  // 👑 PRINCE2 7th Edition
  // =============================
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
      { id: "1", title: "Introduction", text: "Overview of PRINCE2 structure and purpose.", page: 1 },
      { id: "2", title: "Principles", text: "Seven guiding principles.", page: 19 },
      { id: "3", title: "People", text: "Leading teams, communication, and people focus.", page: 31 },
      { id: "4", title: "Introduction to PRINCE2 Practices", text: "Structure and purpose of PRINCE2 practices.", page: 49 },
      { id: "5", title: "Business Case", text: "Defines justification and continued viability.", page: 55 },
      { id: "6", title: "Organizing", text: "Roles, responsibilities, and governance.", page: 73 },
      { id: "7", title: "Plans", text: "Creating and maintaining effective plans.", page: 97 },
      { id: "8", title: "Quality", text: "Quality management processes.", page: 127 },
      { id: "9", title: "Risk", text: "Risk identification and mitigation.", page: 147 },
      { id: "10", title: "Issues", text: "Managing project issues and changes.", page: 167 },
      { id: "11", title: "Progress", text: "Monitoring progress and control.", page: 185 },
      { id: "12", title: "Introduction to PRINCE2 Processes", text: "PRINCE2 process overview.", page: 213 },
      { id: "13", title: "Starting Up a Project", text: "Project initiation and setup.", page: 219 },
      { id: "14", title: "Directing a Project", text: "Project board responsibilities.", page: 229 },
      { id: "15", title: "Initiating a Project", text: "Planning and preparing project framework.", page: 239 },
      { id: "16", title: "Controlling a Stage", text: "Monitoring and controlling each stage.", page: 251 },
      { id: "17", title: "Managing Product Delivery", text: "Coordinating deliverable production.", page: 261 },
      { id: "18", title: "Managing a Stage Boundary", text: "Managing transitions between stages.", page: 269 },
      { id: "19", title: "Closing a Project", text: "Formal closure and evaluation.", page: 277 },
      { id: "20", title: "Appendices", text: "Management products, roles, glossary, and index.", page: 285 },
    ],
  },

  // =============================
  // 🌍 ISO 21500:2021
  // =============================
  {
    slug: "iso21500",
    title: "ISO 21500:2021 - Guidance on Project, Programme and Portfolio Management",
    version: "2021",
    meta: {
      publisher: "International Organization for Standardization",
      year: "2021",
      domain: "Project Management",
      country: "International",
      keyConcepts: [
        "Governance Framework",
        "Alignment with Organizational Strategy",
        "Integrated Management Approaches",
      ],
    },
    sections: [
      { id: "1", title: "Scope", text: "", page: 1 },
      { id: "2", title: "Normative References", text: "", page: 1 },
      { id: "3", title: "Terms and Definitions", text: "", page: 1 },
      {
        id: "4",
        title: "Project, Programme and Portfolio Management Concepts",
        text: "Defines the principles, organizational, and external environments.",
        page: 3,
        subsections: [
          { id: "4.1", title: "General", page: 3 },
          { id: "4.2", title: "Projects, Programmes and Portfolios", page: 4 },
          { id: "4.3", title: "Organizational Environment", page: 5 },
          { id: "4.4", title: "External Environment", page: 5 },
          { id: "4.5", title: "Strategy Implementation", page: 6 },
          { id: "4.6", title: "Integrated Governance and Management Approaches", page: 7 },
        ],
      },
      {
        id: "5",
        title: "Standards on Project, Programme and Portfolio Management",
        text: "Overview of standards and selection considerations.",
        page: 8,
        subsections: [
          { id: "5.1", title: "General", page: 8 },
          { id: "5.2", title: "Overview", page: 9 },
          { id: "5.3", title: "Benefits of Using Standards", page: 10 },
          { id: "5.4", title: "Organizational Considerations for Selection", page: 11 },
        ],
      },
      { id: "6", title: "Bibliography", text: "", page: 12 },
    ],
  },
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
