import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10"><Loader/></div>;

  return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
