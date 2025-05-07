import axios from 'axios';
import { ApiService } from '../ApiService';

export class TransactionsApi {

  static getAllTransactions = async () => {
    const response = await axios.get(`${ApiService.getUrl()}/transactions`);
    return response.data.transactions;
  };

  static getTransaction = async (transactionId: string) => {
    const response = await axios.get(`${ApiService.getUrl()}/transactions/${transactionId}`);
    return response.data;
  };

  static getTransactionsByUserIds = async (userIds: string | string[]) => {
    const ids = Array.isArray(userIds) ? JSON.stringify(userIds) : userIds;
    const isMultiple = Array.isArray(userIds);
    const endpoint = isMultiple 
      ? `/transactions/users/${encodeURIComponent(ids)}`
      : `/transactions/user/${userIds}`;
  
    const response = await axios.get(`${ApiService.getUrl()}${endpoint}`);
    return response.data.transactions;
  };  

  static updateTransactions = async (transactions: any[]) => {
    const response = await axios.put(`${ApiService.getUrl()}/transactions/update-batch`, {
      transactions
    });
    return response.data;
  };
}
