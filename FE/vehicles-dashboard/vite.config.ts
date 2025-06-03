import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    server: {
      https: {
        key: '../../cert/localhost-key.pem',
        cert: '../../cert/localhost.pem',
      },
      host: 'localhost',
      port: 3000,
    },
  };
});
