import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthResponse } from '../types/Auth';
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
    user: AuthResponse | null;
    token: string | null;
    login: (data: AuthResponse) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            const decodedToken: any = jwtDecode(storedToken);
            if (decodedToken.exp * 1000 > Date.now()) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } else {
                localStorage.clear();
            }
        }
    }, []);

    const login = (data: AuthResponse) => {
        setToken(data.token);
        setUser(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
