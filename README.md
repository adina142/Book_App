# 🌍 Project Management Standards Repository

A comprehensive **web application** for exploring, comparing, and managing project management standards including **PMBOK 7th Edition**, **PRINCE2 7th Edition**, and **ISO 21500:2021**.

---

## 🌟 Features

### 📚 Standards Repository
- **Complete Standards Library:** Full content for PMBOK 7th Edition, PRINCE2 7th Edition, and ISO 21500:2021  
- **Advanced Search:** Search across all standards, sections, and content  
- **Bookmarking System:** Save standards and individual sections for quick access  
- **Navigation:** Hierarchical table of contents with deep linking  
- **Multiple Formats:** Support for web viewing with links to official PDF/EPUB sources  

---

### ⚖️ Comparison Engine
- **Side-by-Side Analysis:** Compare methodologies across key topics  
- **Topic-Based Comparisons:** Pre-built comparisons for Risk Management, Quality Management, Stakeholder Engagement, and more  
- **Deep Linking:** Navigate directly to relevant sections in standards  
- **Insights Dashboard:** Analysis of similarities, differences, and unique points  
- **Implementation Recommendations:** Practical guidance for methodology selection  

---

### 🔧 User Experience
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile  
- **Modern UI:** Clean, professional interface with intuitive navigation  
- **Fast Performance:** Optimized loading and smooth interactions  
- **Accessibility:** WCAG-compliant design patterns  

---

## 🚀 Quick Start

### 🧩 Prerequisites
- Node.js (v14 or higher)  
- MongoDB (v4.4 or higher)  
- npm or yarn  

### 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/project-standards-repository.git
cd project-standards-repository
```

#### Install dependencies
```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### ⚙️ Environment Setup
Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/standards
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
```

### 💾 Database Setup
```bash
# Seed the database with standards data
cd backend
npm run seed
```

### ▶️ Start the application
```bash
# Start backend server (from backend directory)
npm start

# Start frontend development server (from frontend directory)
npm start
```

### 🌐 Access the application
- **Frontend:** http://localhost:3000  
- **Backend API:** http://localhost:5000  

---

## 📁 Project Structure

```plaintext
project-standards-repository/
├── backend/
│   ├── controllers/
│   │   └── standardController.js
│   ├── models/
│   │   └── Standard.js
│   ├── routes/
│   │   ├── standardRoutes.js
│   │   └── comparisonRoutes.js
│   ├── scripts/
│   │   └── seedStandards.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Standards/
│   │   │   │   ├── Standards.js
│   │   │   │   └── Standards.css
│   │   │   └── Comparisons/
│   │   │       ├── Comparisons.js
│   │   │       └── Comparisons.css
│   │   ├── hooks/
│   │   │   └── useFetch.js
│   │   └── App.js
│   └── public/
└── README.md
```

---

## 🧰 Technology Stack

### 🖥 Backend
- Node.js – Runtime environment  
- Express.js – Web framework  
- MongoDB – Database  
- Mongoose – ODM for MongoDB  
- JWT – Authentication  

### 💻 Frontend
- React.js – UI library  
- React Router – Navigation  
- CSS3 – Styling with modern features  
- Axios – HTTP client  

---

## 📊 API Endpoints

### Standards
| Method | Endpoint | Description |
|:-------|:----------|:------------|
| GET | `/api/standards/all` | Get all standards |
| GET | `/api/standards/:slug` | Get a specific standard |
| GET | `/api/standards/search?q=:query` | Search standards |
| POST | `/api/standards` | Create new standard *(protected)* |

### Comparisons
| Method | Endpoint | Description |
|:-------|:----------|:------------|
| GET | `/api/comparisons` | Get all comparisons |
| POST | `/api/comparisons` | Create new comparison |

---

## 🎯 Usage Examples

### 🔍 Exploring Standards
1. Navigate to the **Standards** section  
2. Use search to find specific content  
3. Click on a standard to view detailed sections  
4. Bookmark important sections for quick access  

### ⚖️ Using the Comparison Engine
1. Go to **Comparison Engine**  
2. Select a topic (e.g., "Risk Management")  
3. View side-by-side analysis  
4. Click section links to navigate to standards  
5. Review insights and recommendations  

---

## 🔧 Development

### Adding New Standards
1. Create a standard document in MongoDB format  
2. Add it to `backend/scripts/seedStandards.js`  
3. Run `npm run seed` to update database  

### Creating New Comparisons
1. Add topic to `comparisonTopics` array in `Comparisons.js`  
2. Implement topic-specific insights in `generateComprehensiveInsights()`  
3. Add recommendations in `generateRecommendations()`  

### Customizing Styling
- Modify component-specific CSS files  
- Update color scheme in CSS variables  
- Adjust responsive breakpoints as needed  

---

## 🤝 Contributing

We welcome contributions!  

1. **Fork** the repository  
2. **Create** a feature branch  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes  
   ```bash
   git commit -m "Add some amazing feature"
   ```
4. **Push** to your branch  
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

---

