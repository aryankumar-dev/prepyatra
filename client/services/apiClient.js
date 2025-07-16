// src/services/apiClient.js
import axios from 'axios';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL, // e.g., http://localhost:3000/api
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true, // ✅ Important for sending cookies
    });
  }

  // 🔁 Generic request method
  async request(endpoint, options = {}) {
    const { method = 'GET', data = null, params = null, headers = {} } = options;
    try {
      const response = await this.client.request({
        url: endpoint,
        method,
        data,
        params,
        headers: {
          ...this.client.defaults.headers,
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  // 👤 Auth routes
  async signup(fullName, email, password, username) {
    return this.request('/auth/register', {
      method: 'POST',
      data: { fullName, email, password, username },
    });
  }

  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      data: { email, password },
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // 👤 Check user login for protected routes
  async getCurrentUser() {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  async getChatResponse(message) {
  const res = await axios.post("http://localhost:3000/api/chat", { message });
  return res.data.reply;
}


}



const apiClient = new ApiClient();
export default apiClient;
