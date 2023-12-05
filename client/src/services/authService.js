import axios from "axios";

const baseUrl = "http://localhost:5000/";
const AuthService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${baseUrl}api/login`, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async register(username, email, password) {
    console.log("test register");
    try {
      const response = await axios.post(`${baseUrl}api/register`, {
        username,
        email,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },
};

export default AuthService;
