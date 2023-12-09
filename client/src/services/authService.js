import axios from "axios";

const isDevelopment = false;
const baseUrl = isDevelopment
  ? "http://localhost:5000"
  : "https://expertlab-sprint4-backend.onrender.com";

const AuthService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response.data.error);
      throw error;
    }
  },

  async register(username, email, password) {
    console.log("test register");
    try {
      const response = await axios.post(`${baseUrl}/api/register`, {
        username,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response.data.error); // Accessing the specific error message from the response
      throw error;
    }
  },
};

export default AuthService;
