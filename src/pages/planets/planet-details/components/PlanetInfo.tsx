import { Badge, Grid, Group, Text, Title } from '@mantine/core';
import { IconArrowNarrowLeftDashed } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Planet, User } from 'types/PagesInterfaces';
import { formatNumbers } from 'utils/numbers';
import { humanizeString } from 'utils/text';

interface PlanetInfoProps {
  planet: Planet;
  users: User[];
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet, users }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Group align='center' mb='lg'>
        <IconArrowNarrowLeftDashed size={36} onClick={goBack} className='go-back' style={{ cursor: 'pointer' }} />
        <Title order={1} mb={4}>{planet?.name}</Title>
      </Group>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Text><strong>Climate:</strong> {humanizeString(planet?.climate)}</Text>
          <Text><strong>Terrain:</strong> {humanizeString(planet?.terrain)}</Text>
          <Text><strong>Population:</strong> {formatNumbers(planet?.population)}</Text>
          <Text><strong>Gravity:</strong> {humanizeString(planet?.gravity)}</Text>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Text><strong>Rotation Period:</strong> {planet?.rotation_period} hours</Text>
          <Text><strong>Orbital Period:</strong> {planet?.orbital_period} days</Text>
          <Text><strong>Diameter:</strong> {formatNumbers(planet?.diameter)}</Text>
          <Text><strong>Surface Water:</strong> {planet?.surface_water === 'unknown' ? 'Unknown' : `${planet?.surface_water} %`}</Text>
        </Grid.Col>
      </Grid>
      <Group align="center" mt="sm">
        <Title order={4}>Residents</Title>
        <Group gap="xs" >
          {users?.map((user: any) => (
            <Badge key={user.id} color="gray">{user.name}</Badge>
          ))}
          {users.length === 0 && <Text>No residents found</Text>}
        </Group>
      </Group>

    </>
  );
};

export default PlanetInfo;
