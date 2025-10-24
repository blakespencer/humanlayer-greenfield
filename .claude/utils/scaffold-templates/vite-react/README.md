# Vite + React 19 + TypeScript Template

Lightning-fast SPA development with Vite's instant HMR and modern build system.

## Initialization

```bash
npm create vite@latest . -- --template react-ts
npm install
```

## What's Included

- ✅ Vite 5 build tool
- ✅ React 19
- ✅ TypeScript configuration
- ✅ ESLint configuration
- ✅ Hot Module Replacement (HMR)
- ✅ Optimized production builds

## Project Structure

```
vite-react-project/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   ├── services/        # API services
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/              # Static assets
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Environment Variables

Create `.env`:
```env
# API Configuration
VITE_API_URL=http://localhost:4000/api
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true

# Auth
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

**Note**: All environment variables must be prefixed with `VITE_` to be exposed to client.

## Recommended Packages

### Routing
```bash
npm install react-router-dom
```

### State Management
```bash
npm install zustand          # Lightweight state
npm install @tanstack/react-query  # Server state
```

### Data Fetching
```bash
npm install axios
npm install @tanstack/react-query
```

### Forms & Validation
```bash
npm install react-hook-form zod @hookform/resolvers
```

### UI/Styling
```bash
npm install tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms @tailwindcss/typography
```

### Testing
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event jsdom
```

## Router Setup (React Router v6)

```bash
npm install react-router-dom
```

```typescript
// src/main.tsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
```

## API Service Pattern

```typescript
// src/services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
})

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error)
  }
)

export default api
```

## Vitest Configuration

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
```

## Tailwind CSS Setup

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Build Optimization

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
```

## Deployment

### Static Hosting (Netlify, Vercel, Cloudflare Pages)
```bash
npm run build
# Upload dist/ folder
```

### Nginx
```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Docker
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Best Practices

1. **Code Splitting** - Use dynamic imports for routes
2. **Lazy Loading** - Load components on demand
3. **Environment Variables** - Always prefix with `VITE_`
4. **Type Safety** - Use TypeScript strictly
5. **Bundle Size** - Monitor with `npm run build -- --report`
6. **Asset Optimization** - Use Vite's built-in optimization
7. **Error Boundaries** - Catch and handle React errors

## Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vitest Documentation](https://vitest.dev)
