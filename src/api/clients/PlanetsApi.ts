import axios from 'axios';
import { ApiService } from '../ApiService';

export class PlanetApi {

  static getAllPlanets = async () => {
    const response = await axios.get(`${ApiService.getUrl()}/planets`);
    return response.data;
  };

  static getPlanet = async (planetId: string) => {
    const response = await axios.get(`${ApiService.getUrl()}/planets/${planetId}`);
    return response.data;
  };

}
