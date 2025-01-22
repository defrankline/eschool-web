import React from 'react';
import LoginForm from '../components/LoginForm';
// @ts-ignore
import logo from '../assets/logo-school.png';
import {Box, Card, CardContent, Typography} from '@mui/material';

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
            <Card elevation={3} sx={{width: 400, padding: 2, borderRadius: 2}}>
                <CardContent>
                    {/* Logo */}
                    <Box display="flex" justifyContent="center" mb={3}>
                        <img
                            src={logo}
                            alt="School Logo"
                            style={{width: '80px', height: '80px', objectFit: 'contain'}}
                        />
                    </Box>

                    {/* Title */}
                    <Typography variant="h5" align="center" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" mb={3}>
                        Please login to your account
                    </Typography>

                    {/* Login Form */}
                    <LoginForm/>

                    {/* Forgot Password */}
                    <Box mt={2} textAlign="center">
                        <a
                            href="/forgot-password"
                            style={{
                                textDecoration: 'none',
                                color: '#1976d2',
                                fontSize: '0.875rem',
                            }}
                        >
                            Forgot Password?
                        </a>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;
