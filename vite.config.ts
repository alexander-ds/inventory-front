import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = Number(env.PORT) || 5173

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    envPrefix: ['VITE_', 'PORT', 'AUTH_SERVICE_URL', 'INVENTORY_SERVICE_URL'],
    server: {
      port,
      strictPort: true,
    },
  }
})
