import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api/auth';

const LoginForm: React.FC = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error('AuthContext must be used within AuthProvider');

    const { login: handleLogin } = authContext;
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="!mt-2"
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
