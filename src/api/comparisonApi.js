// src/api/comparisonApi.js
import axiosInstance from "./axiosConfig";

const comparisonApi = {
  compareByTopic: async (topic) => {
    const response = await axiosInstance.get(`/comparisons?topic=${topic}`);
    return response.data;
  },

  getComparisonById: async (id) => {
    const response = await axiosInstance.get(`/comparisons/${id}`);
    return response.data;
  },

  saveComparison: async (data) => {
    const response = await axiosInstance.post("/comparisons", data);
    return response.data;
  },
};

export default comparisonApi;
