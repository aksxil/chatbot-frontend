import axios from "axios";

export const chatAPI = axios.create({
  baseURL: "https://chatbot-backend-umft.onrender.com/api"
});
