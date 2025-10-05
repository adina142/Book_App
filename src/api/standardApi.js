// src/api/standardApi.js
import axiosInstance from "./axiosConfig";

const standardApi = {
  getAllStandards: async () => {
    const response = await axiosInstance.get("/standards");
    return response.data;
  },

  getStandardById: async (id) => {
    const response = await axiosInstance.get(`/standards/${id}`);
    return response.data;
  },

  addStandard: async (standardData) => {
    const response = await axiosInstance.post("/standards", standardData);
    return response.data;
  },
};

export default standardApi;
