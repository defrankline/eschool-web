import React, {createContext, ReactNode, useState} from 'react';

interface LoadingContextProps {
    isLoading: boolean;
    setLoading: (loading: boolean) => void; // The setter function for loading state
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

interface LoadingProviderProps {
    children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({children}) => {
    const [isLoading, setIsLoading] = useState(false); // State to manage the loading indicator

    return (
        <LoadingContext.Provider value={{isLoading, setLoading: setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};
