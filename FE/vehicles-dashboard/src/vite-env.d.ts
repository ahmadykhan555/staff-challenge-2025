/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SSL: string;
  readonly VITE_ENABLE_HTTPS: boolean;
  readonly VITE_SSL_KEY: string;
  readonly VITE_SSL_CERT: string;
  // add more as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
