import { ApiService } from "../ApiService";
import axios from "axios";

export class ExchangeRateApi {

  static getExchangeRate = async () => {
    const response = await axios.get(`${ApiService.getUrl()}/exchange-rate`);
    return response.data;
  };

}