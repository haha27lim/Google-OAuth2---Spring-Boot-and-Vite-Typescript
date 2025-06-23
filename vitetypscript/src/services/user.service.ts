import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "test/all");
  }

  getUserBoard() {
    return axios.get(API_URL + "test/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "test/mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "test/admin", { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + "users", { headers: authHeader() });
  }

  updateUser(id: number, userData: any) {
    const headers = authHeader();
    console.log('Update user request:', {
      url: `${API_URL}users/${id}`,
      headers,
      data: userData
    });
    return axios.put(`${API_URL}users/${id}`, userData, { 
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      }
    });
  }

  deleteUser(id: number) {
    return axios.delete(`${API_URL}users/${id}`, { headers: authHeader() });
  }

}

export default new UserService();