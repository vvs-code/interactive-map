import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: './src',  // Указываем корневую папку, где лежит index.html
    server: {
        port: 3000,
        host: "localhost",
    },
    build: {
        rollupOptions: {
            input: './src/index.html'  // Указываем точный путь к index.html
        }
    }
});
