import { AppShell, Burger, Group, Text, NavLink, useMantineColorScheme } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/theme-toggle/ThemeToggle';
import { IconPlanet, IconAlien } from '@tabler/icons-react';

const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const isMobile = useMediaQuery('(max-width: 48em)');
  console.log('🚀 ~ MainLayout ~ isMobile:', isMobile);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="lg" justify='space-between'>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <img
            onClick={() => navigate('/planets')}
            src="https://static.wikia.nocookie.net/esstarwars/images/4/4c/Senate_seal.svg"
            alt="Logo"
            style={{ width: 32, height: 32, filter: isDark ? 'invert(1)' : '', cursor: 'pointer' }} />
          {!isMobile && (<Text fw={600}>CORUSCANT BANK</Text>)}
          <ThemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          label="Planets"
          leftSection={<IconPlanet size={18} />}
          active={location.pathname.startsWith('/planets')}
          onClick={() => navigate('/planets')}
        />
        <NavLink
          disabled
          label="Users"
          leftSection={<IconAlien size={18} />}
          active={location.pathname.startsWith('/users')}
          onClick={() => navigate('/users')}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
