import { usePlanets } from "api/queries/planets/usePlanetsQuery";
import { useMemo, useState } from "react";
import { Planet } from "types/PagesInterfaces";
import { humanizeString } from "utils/text";

export const usePlanetsHook = () => {
  const [search, setSearch] = useState('');
  const [selectedTerrains, setSelectedTerrains] = useState<string[]>([]);
  const [selectedClimates, setSelectedClimates] = useState<string[]>([]);

  const { data, isLoading } = usePlanets();

  const planets = useMemo(() => {
    if (!data?.planets) return [];

    return data.planets
      .filter((planet: Planet) => {
        const matchesSearch = planet.name.toLowerCase().includes(search.toLowerCase());

        const matchesTerrain =
          selectedTerrains.length === 0 ||
          planet.terrain?.split(',')
            .map((terrain: string) => terrain.trim().toLowerCase())
            .some((terrain: string) => selectedTerrains.includes(terrain));

        const matchesClimate =
          selectedClimates.length === 0 ||
          planet.climate?.split(',')
            .map((climate: string) => climate.trim().toLowerCase())
            .some((climate: string) => selectedClimates.includes(climate));

        return matchesSearch && matchesTerrain && matchesClimate;
      })
      .sort((a: Planet, b: Planet) => -b?.name?.localeCompare(a?.name));
  }, [data, search, selectedTerrains, selectedClimates]);

  const availableTerrains = useMemo(() => {
    const terrainSet = new Set<string>();

    data?.planets?.forEach((planet: Planet) => {
      planet.terrain?.split(',').forEach((terrain: string) => {
        const clean = terrain.trim().toLowerCase();
        if (clean) terrainSet.add(clean);
      });
    });

    return Array.from(terrainSet)
      .map((terrain: string) => ({
        value: terrain,
        label: humanizeString(terrain),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data]);

  const availableClimates = useMemo(() => {
    const climateSet = new Set<string>();

    data?.planets?.forEach((planet: Planet) => {
      planet.climate?.split(',').forEach((climate: string) => {
        const clean = climate.trim().toLowerCase();
        if (clean) climateSet.add(clean);
      });
    });

    return Array.from(climateSet)
      .map((climate: string) => ({
        value: climate,
        label: humanizeString(climate),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [data]);
  const clearFilters = () => {
    setSearch('');
    setSelectedTerrains([]);
    setSelectedClimates([]);
  };
  return {
    availableTerrains,
    availableClimates,
    planets,
    isLoading,
    search,
    setSearch,
    selectedTerrains,
    setSelectedTerrains,
    selectedClimates,
    setSelectedClimates,
    clearFilters
  };
};