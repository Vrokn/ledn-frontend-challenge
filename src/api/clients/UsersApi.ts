
import axios from "axios";
import { ApiService } from "../ApiService";

export class UsersApi {

  static getUsers = async () => {
    const response = await axios.get(`${ApiService.getUrl()}/users`);
    return response.data;
  };

  static getUser = async (userId: string) => {
    const response = await axios.get(`${ApiService.getUrl()}/users/${userId}`);
    return response.data;
  };

  static getUserByHomeWorld = async (planetId: string) => {
    const response = await axios.get(`${ApiService.getUrl()}/users/planet/${planetId}`);
    return response.data;
  };

}