// client/src/api/chat.js
import axios from "axios";

export const getChatResponse = async (message) => {
  const res = await axios.post("http://localhost:3000/api/chat", { message });
  return res.data.reply;
};
