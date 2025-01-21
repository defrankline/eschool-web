import React, {useContext} from 'react';
import {LoadingContext} from '../context/LoadingContext';

const GlobalProgressBar: React.FC = () => {
    const loadingContext = useContext(LoadingContext);
    if (!loadingContext) throw new Error('LoadingContext must be used within LoadingProvider');

    const {isLoading} = loadingContext;

    return (
        <div>
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50"></div>
            )}
        </div>
    );
};

export default GlobalProgressBar;
