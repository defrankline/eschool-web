import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";
import {AuthResponse} from '../types/Auth';

interface AuthContextProps {
    user: AuthResponse | null;
    token: string | null;
    isLoading: boolean; // To track the session restoration process
    login: (data: AuthResponse) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<AuthResponse | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Tracks if session restoration is in progress

    useEffect(() => {
        const restoreSession = () => {
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
            setIsLoading(false); // Finish session restoration
        };

        restoreSession();
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
        <AuthContext.Provider value={{user, token, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
