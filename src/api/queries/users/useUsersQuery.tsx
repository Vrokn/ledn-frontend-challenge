import { useQuery } from '@tanstack/react-query';
import { UsersApi } from '../../clients/UsersApi';
import { QUERY_KEYS } from '../constants';

export const useUsers = () =>
  useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: UsersApi.getUsers,
  });

export const useUser = (userId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => UsersApi.getUser(userId),
    enabled: !!userId,
  });

export const useUsersByPlanet = (planetId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.USERS_BY_PLANET, planetId],
    queryFn: () => UsersApi.getUserByHomeWorld(planetId),
    enabled: !!planetId,
  });
