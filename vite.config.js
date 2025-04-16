import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
 // تغيير البورت إلى 3000
    proxy: {
      "/api": {
        target: "https://royal-hotel-backend.onrender.com",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
