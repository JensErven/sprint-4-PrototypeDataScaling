import axios from "axios";

const isDevelopment = false;
const baseUrl = isDevelopment
  ? "http://localhost:5000"
  : "https://expertlab-sprint4-backend.onrender.com";

const PlantsService = {
  async getPlants(page = 1) {
    try {
      const response = await axios.get(`${baseUrl}/api/plants?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching plants:", error);
      throw error;
    }
  },

  async SearchPlantsByCommonName(page = 1, searchTerm) {
    try {
      const response = await axios.get(
        `${baseUrl}/api/plants/search?term=${searchTerm}&page=${page}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching plants:", error);
      throw error;
    }
  },

  async getPlantById(id) {
    try {
      const response = await axios.get(`${baseUrl}/api/plants/plant/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching plant by id:", error);
      throw error;
    }
  },
};

export default PlantsService;
