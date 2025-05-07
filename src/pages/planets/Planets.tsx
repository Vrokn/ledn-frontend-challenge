import { Title, SimpleGrid, Box, MultiSelect, Grid } from '@mantine/core';
import { TableSearch } from '../../components/table-search/TableSearch';
import { LoadingFallback } from '../../components/loading-fallback/LoadingFallback';
import { Planet } from '../../types/PagesInterfaces';
import PlanetCard from './components/PlanetCard';
import { usePlanetsHook } from './Planets.hook';
import ClearTableFilter from 'components/clear-table-filter/ClearTableFilter';

const Planets = () => {
  const {
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
  } = usePlanetsHook();

  if (isLoading) {
    return <LoadingFallback />;
  }

  return (
    <Box p="md">
      <Grid gutter="lg" mb="lg" align='flex-end'>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <Title order={1}>Planets</Title>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <MultiSelect
            placeholder="Filter by terrains"
            data={availableTerrains}
            value={selectedTerrains}
            onChange={setSelectedTerrains}
            clearable
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <MultiSelect
            placeholder="Filter by climates"
            data={availableClimates}
            value={selectedClimates}
            onChange={setSelectedClimates}
            clearable
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <ClearTableFilter handleClick={clearFilters} fullWidth />
        </Grid.Col>
      </Grid>
      <TableSearch
        placeholder="Search planets by name"
        value={search}
        handleChange={(_, val) => setSearch(val)}
      />
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg" pt={'lg'}>
        {planets.map((planet: Planet) => (
          <PlanetCard key={planet.id} planet={planet} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Planets;
