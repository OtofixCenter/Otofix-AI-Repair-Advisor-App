// vite.config.ts veya vite.config.js
export default {
  server: {
    port: 3000, // veya 5173, 5174 vs.
    host: true,
    allowedHosts: 'all', // Replit gibi platformlar için şart
  }
}
