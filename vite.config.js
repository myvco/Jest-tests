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
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: [
        'src/utils/**/*.js',
        'src/component/**/*.jsx'
      ],
      exclude: [
        'src/main.jsx',
        'src/App.jsx',
        'src/component/Counter.jsx'
      ]
    }
  }
})