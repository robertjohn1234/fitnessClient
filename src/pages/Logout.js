import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Logout() {

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    localStorage.clear();
    setUser(null); // Clear the user context

  }, [setUser]);

  return <Navigate to='/login' />;
}
