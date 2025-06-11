# Frontend Application

## Overview
React-based frontend application for the Palworld Breeding Calculator. Built with Vite for fast development and optimized production builds.

## Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router v6
- **HTTP Client**: Axios

## Project Structure
```
frontend/
├── src/
│   ├── pages/              # Page components
│   │   └── BreedingCalculator.tsx
│   ├── components/         # Reusable components (to be added)
│   ├── hooks/             # Custom React hooks (to be added)
│   ├── services/          # API service layer (to be added)
│   ├── types/             # TypeScript type definitions (to be added)
│   ├── utils/             # Utility functions (to be added)
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles (Tailwind imports)
├── public/                # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Current Features
- Basic breeding calculator interface
- Parent selection dropdowns
- Breeding result display
- Special combination indicator

## Development
```bash
# Install dependencies
cd frontend && bun install

# Start development server
bun run dev

# Build for production
bun run build
```

The development server runs on port 5173 with API proxy configured to forward `/api/*` requests to the backend server.

## API Integration
- Uses React Query for data fetching and caching
- API calls are made to `/api/breeding/*` endpoints
- Automatic request proxying in development

## Future Enhancements
- Visual breeding tree/diagram
- Passive skill inheritance calculator
- Multi-generation breeding path finder
- Search and filter functionality
- Pal comparison tools
- Mobile-responsive improvements
- Dark mode support