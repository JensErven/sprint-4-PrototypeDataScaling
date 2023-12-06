import axios from "axios";

const baseUrl = "http://localhost:5000/";
const PlantsService = {
  async getPlants(page = 1) {
    try {
      const response = await axios.get(`${baseUrl}api/plants?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching plants:", error);
      throw error;
    }
  },
};

export default PlantsService;
