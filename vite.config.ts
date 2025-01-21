import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 4200,
        proxy: {
            '/api/v1': {
                target: 'http://localhost:9090',
                secure: false,
            },
        },
    },
});
