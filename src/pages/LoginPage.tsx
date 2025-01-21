import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '8px' }}>
                <h1 style={{ textAlign: 'center' }}>Login</h1>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
