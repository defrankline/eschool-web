import React, {useContext} from 'react';
import {LoadingContext} from '../context/LoadingContext';

const GlobalSpinner: React.FC = () => {
    const loadingContext = useContext(LoadingContext);
    if (!loadingContext) throw new Error('LoadingContext must be used within LoadingProvider');

    const {isLoading} = loadingContext;

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
    );
};

export default GlobalSpinner;
