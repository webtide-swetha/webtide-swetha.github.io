/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAT_ENDPOINT: string;
  readonly VITE_OPENROUTER_API_KEY: string;
  readonly VITE_FORM_ENDPOINT: string;
  readonly VITE_FORM_ACCESS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
