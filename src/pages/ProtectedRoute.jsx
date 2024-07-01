import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  console.log('User authenticated, rendering protected route');
  return children;
};
export default ProtectedRoute