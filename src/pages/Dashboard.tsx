import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

const Dashboard: React.FC = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error('AuthContext must be used within AuthProvider');

    const {user, logout} = authContext;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="p-6 bg-gray-100 h-screen">
            <div className="bg-white p-6 shadow rounded">
                <h1 className="text-2xl font-bold">Welcome, {user?.firstName} {user?.lastName}!</h1>
                <p className="text-gray-600 mt-2">School: <strong>{user?.school.name}</strong></p>
                <p className="text-gray-600 mt-1">Role: <strong>{user?.roles.join(', ')}</strong></p>

                {/* MUI Button */}
                <Button
                    variant="contained"
                    color="primary"
                    className="mt-4"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Dashboard;
