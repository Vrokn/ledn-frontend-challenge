import { Card, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Planet } from 'types/PagesInterfaces';
import { humanizeString } from 'utils/text';

interface PlanetCardProps {
  planet: Planet;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  const navigate = useNavigate();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() => navigate(`/planets/${planet.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <Title order={3}>{planet.name}</Title>
      <Text size="sm" c="dimmed" mt="xs">
        Terrain: {humanizeString(planet.terrain)}
      </Text>
      <Text size="sm" c="dimmed">
        Climate: {humanizeString(planet.climate)}
      </Text>
    </Card>
  );
};

export default PlanetCard;
