# System Patterns

## System Architecture

### Overall Design Pattern: Non-Invasive Fork Extension
```
┌─────────────────────┐
│   Wrapper Server    │ (server.ts - Port 8080)
├─────────────────────┤
│  ┌───────────────┐  │
│  │ Original API  │  │ → /api/v1/* (Proxied from port 3000)
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Breeding API  │  │ → /api/breeding/*
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │   Frontend    │  │ → / (Static files from frontend/dist)
│  └───────────────┘  │
└─────────────────────┘
```

### Key Technical Decisions

#### 1. Wrapper Server Pattern
- **Decision**: Use a separate server.ts that wraps the original API
- **Rationale**: Preserves original code, enables unified access
- **Implementation**: ElysiaJS groups and proxying

#### 2. Directory Isolation
- **Decision**: Keep all custom code in separate directories
- **Rationale**: Maintains fork synchronization capability
- **Structure**:
  - `breeding-api/` - Custom API logic
  - `frontend/` - React application
  - `server.ts` - Wrapper server
  - Original `src/` - Untouched

#### 3. API Route Design
- **Original**: `/api/v1/*` - Preserves all original endpoints
- **Breeding**: `/api/breeding/*` - New breeding-specific endpoints
- **Pattern**: RESTful design with clear resource naming

## Design Patterns in Use

### Backend Patterns

#### 1. Service Layer Pattern
```typescript
// calculator.ts acts as a service layer
export function calculateBreeding(parent1Key: string, parent2Key: string): IBreedingResult
export function getBreedingCombinations(targetPalKey: string): Array<[IPal, IPal]>
```

#### 2. Data Access Pattern
- Static JSON files loaded at startup
- In-memory Maps for O(1) lookups
- No database required

#### 3. Route Handler Pattern
```typescript
// Clean separation of routes from business logic
breedingRoutes.get("/calculate", ({ query }) => {
  const result = calculateBreeding(query.parent1, query.parent2);
  return result;
})
```

### Frontend Patterns

#### 1. Component-Based Architecture
- Pages contain business logic
- Components are reusable UI pieces
- Clear separation of concerns

#### 2. Data Fetching Pattern
- React Query for server state management
- Axios for HTTP requests
- Centralized query keys

#### 3. State Management
- Local state for UI (useState)
- Server state via React Query
- No global state needed (yet)

## Component Relationships

### Data Flow
```
Frontend (React) 
    ↓ (HTTP Request)
Wrapper Server (server.ts)
    ↓ (Route to appropriate handler)
    ├→ Original API (src/index.ts) - for /api/v1/*
    └→ Breeding API (breeding-api/routes.ts) - for /api/breeding/*
         ↓
    Calculator Service (breeding-api/calculator.ts)
         ↓
    Static Data (src/*.json files)
```

### Module Dependencies
```
server.ts
├── @elysiajs/static (frontend serving)
├── @elysiajs/cors (CORS handling)
├── ./src/index.ts (original API)
└── ./breeding-api/routes.ts
    └── ./breeding-api/calculator.ts
        └── src/pals.json
        └── src/breeding.json
```

## Critical Implementation Paths

### 1. Breeding Calculation Path
1. User selects two parents in frontend
2. Frontend sends GET request to `/api/breeding/calculate`
3. Server routes to breeding API handler
4. Calculator service:
   - Checks for special combinations
   - Applies standard formula if no special case
   - Finds closest Pal by rank
   - Returns result
5. Frontend displays result with image

### 2. Data Loading Path
1. Server starts
2. Calculator module loads JSON files via Bun.file()
3. Creates Map structures for O(1) lookups
4. Data remains in memory for request lifetime

### 3. Frontend Build/Serve Path
1. Development: Vite dev server with proxy
2. Production: 
   - Build to `frontend/dist`
   - Served statically by wrapper server
   - SPA routing handled by catch-all route

## Error Handling Patterns

### API Errors
- Return JSON error objects with descriptive messages
- Validate inputs before processing
- Handle missing Pals gracefully

### Frontend Errors
- React Query retry logic
- User-friendly error messages
- Fallback UI components

## Security Considerations
- No authentication required (public data)
- CORS enabled for API access
- Input validation on all endpoints
- No user-generated content