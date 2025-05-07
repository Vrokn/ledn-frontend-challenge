import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Redirect from "./Redirect";
import MainLayout from "../layouts/MainLayout";

const Planets = lazy(() => import('../pages/planets/Planets'));
const PlanetDetails = lazy(() => import('../pages/planets/planet-details/PlanetDetails'));
const Users = lazy(() => import('../pages/users/Users'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Redirect />,
  }, {
    path: '/planets',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Planets />,
      },
      {
        path: ':planetId',
        element: <PlanetDetails />,
      },
    ],
  }, {
    path: '/users',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Users />,
      },
    ],
  },
]);