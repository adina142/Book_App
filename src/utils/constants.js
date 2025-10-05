// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const ENDPOINTS = {
  AUTH: `${API_BASE_URL}/auth`,
  STANDARDS: `${API_BASE_URL}/standards`,
  COMPARISON: `${API_BASE_URL}/comparison`,
  PROCESS: `${API_BASE_URL}/process`
};

// Other constants
export const TOKEN_KEY = "auth_token";
export const APP_NAME = "Project Management Comparator";
