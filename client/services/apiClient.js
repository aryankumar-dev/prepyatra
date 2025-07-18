import axios from 'axios';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL, // e.g., http://localhost:3000/api/v1
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials: true,
    });
  }

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

  // ✅ AUTH ROUTES
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
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getCurrentUser() {
    return this.request('/auth/me', { method: 'GET' });
  }

  // ✅ CHAT ROUTE (you are calling directly via axios)
  async getChatResponse(message) {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, { message });
    return res.data.reply;
  }

  // ✅ RECRUITER NETWORK ROUTES
  async createRecruiterNetwork(data) {
    return this.request('/recruiternetwork/create', {
      method: 'POST',
      data,
    });
  }

  async getAllRecruiterNetworks() {
    return this.request('/recruiternetwork/getall', {
      method: 'GET',
    });
  }

async getMyRecruiterNetwork() {
    return this.request(`/recruiternetwork/my`, { method: 'GET' });
}

  async updateRecruiterNetwork(id, data) {
    return this.request(`/recruiternetwork/${id}`, {
      method: 'PUT',
      data,
    });
  }

  async deleteRecruiterNetwork(id) {
    return this.request(`/recruiternetwork/${id}`, {
      method: 'DELETE',
    });
  }

  // ✅ PREP LOG ROUTES
  async createPrepLog(data) {
    return this.request('/preplogs', {
      method: 'POST',
      data,
    });
  }

  async getAllPrepLogs() {
    return this.request('/preplogs', {
      method: 'GET',
    });
  }

 async getMyPrepLogs() {
    return this.request('/preplogs/my', {
        method: 'GET',
    });
}


  async updatePrepLog(id, data) {
    return this.request(`/preplogs/${id}`, {
      method: 'PUT',
      data,
    });
  }

  async deletePrepLog(id) {
    return this.request(`/preplogs/${id}`, {
      method: 'DELETE',
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;
