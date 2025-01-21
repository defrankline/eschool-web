import React from 'react';
import LoginForm from '../components/LoginForm';
// @ts-ignore
import logo from '../assets/logo-school.png';

const LoginPage: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {/* Card Container */}
            <div className="w-72 bg-white p-8 shadow-lg rounded-md">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="w-20 h-20 object-contain"/>
                </div>
                {/* Login Form */}
                <h1 className="text-xl font-bold text-center mb-4">Login</h1>
                <LoginForm/>
                {/* Forgot Password Link */}
                <div className="mt-4 text-center">
                    <a
                        href="/forgot-password"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
