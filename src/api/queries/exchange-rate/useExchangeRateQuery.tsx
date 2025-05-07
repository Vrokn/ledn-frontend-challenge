import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { ExchangeRateApi } from '../../clients/ExchangeRateApi';

export const useExchangeRate = () =>
  useQuery({
    queryKey: [QUERY_KEYS.EXCHANGE_RATE],
    queryFn: ExchangeRateApi.getExchangeRate,
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
