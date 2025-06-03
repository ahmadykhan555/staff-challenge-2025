import { defineConfig, loadEnv, type ServerOptions } from 'vite';
import react from '@vitejs/plugin-react';

const DEFAULT_PORT = 3000;

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  const serverConfig: ServerOptions = {
    open: true,
    port: typeof env.VITE_FE_PORT === 'string' ? JSON.parse(env.VITE_FE_PORT) : DEFAULT_PORT,
    host: env.VITE_BASE_URL,
  };

  if (JSON.parse(env.VITE_ENABLE_HTTPS || '')) {
    (serverConfig.https as Record<string, string>).key = env.VITE_SSL_KEY;
    (serverConfig.https as Record<string, string>).cert = env.VITE_SSL_CERT;
  }

  return {
    plugins: [react()],
    server: {
      ...serverConfig,
    },
  };
});
