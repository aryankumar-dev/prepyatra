
class ApiClient {
    constructor() {
        this.baseUrl = `${import.meta.env.VITE_BACKEND_URL}/recruiternetwork/getall`;
        this.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

    }

    async customFetch(endpoint, options = {}) {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const headers = { ...this.headers, ...options.headers };

            const config = {
                ...options,
                headers,
                credentials: "include",
            };

            const response = await fetch(url, config);
            const data = await response.json();
            return data;

        }
        catch (error) {
            console.error("API Error", error);
            throw error;
        }
    }

    //Auth endpoints

    async signup(fullName, email, password, username) {
        return this.customFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify({ fullName, email, password, username }),
        });
    }

    async login(email, password) {
        return this.customFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
    }

    async logout() {
        return this.customFetch("/auth/logout", {
            method: "POST",
        });
    }

}

const apiClient = new ApiClient();

export default apiClient;
