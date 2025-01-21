import React from 'react';
import LoginForm from '../components/LoginForm';
// @ts-ignore
import logo from '../assets/logo-school.png';
import {Box} from '@mui/material';

const LoginPage: React.FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            className="bg-gray-100"
        >
            {/* Login Card */}
            <div className="w-52 bg-white p-6 shadow-lg rounded-md">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-10 h-10 object-contain"
                    />
                </div>
                {/* Login Form */}
                <h1 className="text-lg font-bold text-center mb-3">Login</h1>
                <LoginForm/>
                {/* Forgot Password Link */}
                <div className="mt-3 text-center">
                    <a
                        href="/forgot-password"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Forgot Password?
                    </a>
                </div>
            </div>
        </Box>
    );
};

export default LoginPage;
