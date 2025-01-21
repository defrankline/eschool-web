import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error('AuthContext must be used within AuthProvider');

    const { token, isLoading } = authContext;

    if (isLoading) {
        // Show a loading indicator or spinner while restoring the session
        return <div>Loading...</div>;
    }

    return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
