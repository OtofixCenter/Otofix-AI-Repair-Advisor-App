import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // Replit için gerekli
    port: 3000,
    hmr: {
      clientPort: 443
    },
    // Bu satırı ekleyin:
    fs: {
      allow: ['.'] // Replit için gerekli, projenin tüm dosyalarına erişim sağlar
    }
  }
})
