import axios from "axios";

const baseUrl = "https://api.openai.com/v1/chat/completions";

const OpenaiService = {
  async sendMessage(message) {
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    };

    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };

    try {
      const response = await axios.post(baseUrl, data, { headers: headers });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to handle it outside this function
    }
  },
};

export default OpenaiService;
