import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { PlanetApi } from '../../clients/PlanetsApi';

export const usePlanets = () =>
  useQuery({
    queryKey: [QUERY_KEYS.PLANETS],
    queryFn: PlanetApi.getAllPlanets,
  });

export const usePlanet = (planetId: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.PLANET, planetId],
    queryFn: () => PlanetApi.getPlanet(planetId),
    enabled: !!planetId,
  });
