import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error('AuthContext must be used within AuthProvider');

    const { user, logout } = authContext;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Welcome, {user?.firstName} {user?.lastName}!</h1>
            <p>School: <strong>{user?.school.name}</strong></p>
            <p>Role: <strong>{user?.roles.join(', ')}</strong></p>
            <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '5px' }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
