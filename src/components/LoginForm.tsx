import React, {useContext, useState} from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {login} from '../api/auth';

const LoginForm: React.FC = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error('AuthContext must be used within AuthProvider');

    const {login: handleLogin} = authContext;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login(email, password); // Call login API
            handleLogin(data); // Save user and token in context and local storage
            navigate('/dashboard'); // Redirect to Dashboard
        } catch (err: any) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <Box display="flex" flexDirection="column" gap={3}>
                {/* Error Message */}
                {error && (
                    <Typography color="error" textAlign="center">
                        {error}
                    </Typography>
                )}

                {/* Email Input */}
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                {/* Password Input */}
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Login
                </Button>
            </Box>
        </form>
    );
};

export default LoginForm;
