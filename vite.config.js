import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/Jest-tests/',
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./setupTests.js'],
        coverage: {
            reporter: ['text', 'html']
        }
    }
})

