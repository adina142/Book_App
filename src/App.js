// src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";
import "./styles/global.css";
import "./styles/variables.css";
import "./styles/layout.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Sidebar />
          <main className="page-content">
            <AppRoutes />
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
