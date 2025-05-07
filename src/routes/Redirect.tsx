import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Redirect = () => {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      return navigate('/planets');
    }
  }, [location.pathname, navigate]);
  return null;

};

export default Redirect;
