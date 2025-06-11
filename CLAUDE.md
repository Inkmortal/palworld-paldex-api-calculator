# Palworld Paldex API - Project Overview

## About
This is the first Palworld API, providing a REST API to query Palworld Paldex data. It's built with Bun runtime and ElysiaJS framework.

## Technology Stack
- **Runtime**: Bun
- **Framework**: ElysiaJS
- **Search**: Elasticlunr
- **Language**: TypeScript

## API Endpoints

### GET /
Main endpoint that returns paginated Pal data with search and filtering capabilities.

Query Parameters:
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page (default: 10) 
- `term` (string): Full-text search term
- `name` (string): Filter by Pal name
- `types` (string): Filter by type
- `suitability` (string): Filter by work suitability
- `drops` (string): Filter by item drops
- `key` (string): Filter by Pal key/ID

## Project Structure
```
/
├── src/
│   ├── index.ts              # Main application entry point
│   ├── pals.json            # Complete Pal data
│   ├── breeding.json        # Breeding combinations
│   ├── passive_skills.json  # Passive skill definitions
│   ├── item.json           # Item data
│   ├── gear.json           # Gear/equipment data
│   ├── common/             # Shared interfaces and enums
│   ├── services/           # Service layer (search)
│   ├── useCases/           # Business logic
│   └── schemas/            # Request/response schemas
├── public/images/          # Static image assets
└── package.json           # Project dependencies

```

## Running the Project
```bash
# Install dependencies
bun install

# Start development server
bun start

# Or with Docker
docker-compose up
```

## Data Sources
All game data is stored in static JSON files in the `src/` directory. The API loads this data at startup and uses Elasticlunr to provide search functionality.

## Breeding System
The breeding system uses a rank-based calculation:
- Formula: `Child Rank = floor((ParentA Rank + ParentB Rank + 1) / 2)`
- Special breeding combinations are defined in `breeding.json`
- Each Pal has breeding metadata including rank, order, and eligibility

## Extended Architecture (Non-Invasive)
This fork includes additional functionality without modifying the original codebase:

### Additional Directories
```
/
├── breeding-api/          # Custom breeding calculator API
│   ├── calculator.ts      # Breeding logic implementation
│   ├── routes.ts         # API endpoints
│   └── interfaces.ts     # TypeScript interfaces
├── frontend/             # React-based breeding calculator UI
│   ├── src/             # Frontend source code
│   ├── package.json     # Frontend dependencies
│   └── vite.config.ts   # Vite configuration
├── server.ts            # Wrapper server that combines everything
└── package.local.json   # Custom scripts and dependencies
```

### Running the Extended Application
```bash
# Install all dependencies (original + extended)
bun install
bun install @elysiajs/cors concurrently
cd frontend && bun install

# Run the full application (API + Frontend)
bun run server.ts

# Or use the custom scripts
bun run --bun-file=package.local.json dev
```

### API Endpoints (Extended)
- Original API: `http://localhost:8080/api/v1/*`
- Breeding API: `http://localhost:8080/api/breeding/*`
- Frontend: `http://localhost:8080/`

This architecture allows the fork to stay synchronized with the upstream repository while adding new features.

## Memory Bank Instructions

When updating the memory bank for this project, include:

1. **Project Type**: Palworld breeding calculator with API and frontend
2. **Architecture**: Non-invasive fork structure preserving original code
3. **Key Technologies**: Bun, ElysiaJS, React, Vite, TypeScript
4. **API Structure**: 
   - Original API at `/api/v1`
   - Breeding API at `/api/breeding`
   - Frontend served at root
5. **Breeding Logic**: Rank-based calculation with special combinations
6. **Development Focus**: Complex breeding calculator features
7. **Important Constraint**: Cannot modify original src/ files to maintain fork sync

## Memory Bank

@memory-bank-instructions.md