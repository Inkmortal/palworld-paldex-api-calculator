# Tech Context

## Technologies Used

### Runtime & Languages
- **Bun** (v1.0.25+): Fast all-in-one JavaScript runtime
- **TypeScript** (v5.0.0+): Type safety and better developer experience
- **Node.js**: Compatibility layer (via Bun)

### Backend Stack
- **ElysiaJS** (latest): Fast, type-safe web framework for Bun
  - `@elysiajs/static`: Static file serving
  - `@elysiajs/cors`: CORS middleware
- **Elasticlunr** (v0.9.5): Full-text search for Pal data

### Frontend Stack
- **React** (v18.2.0): UI library
- **Vite** (v5.0.8): Build tool and dev server
- **TypeScript** (v5.2.2): Type safety
- **Tailwind CSS** (v3.3.0): Utility-first CSS framework
- **React Router** (v6.21.1): Client-side routing
- **React Query/TanStack Query** (v5.17.9): Server state management
- **Axios** (v1.6.5): HTTP client

### Development Tools
- **Concurrently** (v8.2.2): Run multiple processes
- **ESLint**: Linting (configured for React)
- **PostCSS** & **Autoprefixer**: CSS processing
- **Docker**: Containerization support

## Development Setup

### Prerequisites
```bash
# Required
- Bun (latest version)
- Git

# Optional
- Docker & Docker Compose
- VS Code (recommended editor)
```

### Installation Steps
```bash
# 1. Clone repository
git clone <repo-url>
cd palworld-paldex-api-calculator

# 2. Install backend dependencies
bun install
bun install @elysiajs/cors concurrently

# 3. Install frontend dependencies
cd frontend && bun install
cd ..

# 4. Run development servers
bun run server.ts  # Full app on port 8080
# OR
bun start         # Original API only on port 3000
```

### Development Commands
```bash
# Using package.local.json scripts
bun run --bun-file=package.local.json dev      # Run everything
bun run --bun-file=package.local.json dev:api  # API only
bun run --bun-file=package.local.json dev:frontend  # Frontend only

# Direct commands
bun run server.ts                    # Run wrapper server
cd frontend && bun run dev          # Run frontend dev server
bun --watch run ./src/index.ts      # Run original API with hot reload
```

## Technical Constraints

### Fork Synchronization
- Cannot modify files in `src/` directory
- All custom code must be in separate directories
- Must maintain compatibility with upstream changes

### Performance Requirements
- API response time < 100ms for breeding calculations
- Frontend build size < 500KB (gzipped)
- Support for 1000+ concurrent users

### Browser Support
- Modern browsers only (ES2020+)
- No IE11 support required
- Mobile-responsive design

### Data Constraints
- Read-only data from JSON files
- No database or persistent storage
- All data loaded into memory at startup

## Dependencies

### Backend Dependencies
```json
{
  "dependencies": {
    "@elysiajs/static": "^0.8.1",
    "@elysiajs/cors": "^0.8.0",
    "elasticlunr": "^0.9.5",
    "elysia": "latest"
  },
  "devDependencies": {
    "@types/bun": "latest",
    "@types/elasticlunr": "latest",
    "concurrently": "^8.2.2"
  }
}
```

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1",
    "@tanstack/react-query": "^5.17.9",
    "axios": "^1.6.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

## Tool Usage Patterns

### Bun File Operations
```typescript
// Loading JSON files
const file = Bun.file("src/pals.json");
const data = await file.json();
```

### ElysiaJS Patterns
```typescript
// Route grouping
app.group("/api/breeding", (app) => app.get("/calculate", handler))

// Static file serving
app.use(staticPlugin({ assets: "frontend/dist" }))
```

### React Query Patterns
```typescript
// Data fetching
const { data, isLoading } = useQuery({
  queryKey: ['pals'],
  queryFn: async () => {
    const response = await axios.get('/api/breeding/pals');
    return response.data;
  }
})
```

### Vite Configuration
```typescript
// Proxy configuration for development
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  }
}
```

## Environment Configuration

### Development
- Original API: Port 3000
- Wrapper Server: Port 8080
- Frontend Dev: Port 5173
- Hot reload enabled

### Production
- Single server on port 8080
- Frontend served statically
- API endpoints under /api/*
- Docker support available

## Security Considerations
- No environment variables needed
- No API keys or secrets
- CORS configured for public access
- Input validation on all endpoints