// src/api/processApi.js
import axiosInstance from "./axiosConfig";

const processApi = {
  getProcesses: async () => {
    const response = await axiosInstance.get("/processes");
    return response.data;
  },

  getProcessById: async (id) => {
    const response = await axiosInstance.get(`/processes/${id}`);
    return response.data;
  },

  generateProcess: async (scenarioData) => {
    const response = await axiosInstance.post("/processes/generate", scenarioData);
    return response.data;
  },
};

export default processApi;
