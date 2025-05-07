import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import AppProviders from './providers/AppProviders';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router';
import Blobs from './components/background-blobs/BackgroundDecor';

const App = () => {
  return (
    <AppProviders>
      <Blobs />
      <RouterProvider router={router} />
    </AppProviders>
  );
};

export default App;
