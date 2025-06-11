# Active Context

## Current Work Focus
Architecting the comprehensive breeding calculator with Pal box management, breeding optimization, and passive skill inheritance features.

## Recent Changes

### Extended Architecture Implementation (Completed)
1. Created `server.ts` wrapper that combines original API with new features
2. Set up `breeding-api/` directory with:
   - Calculator logic implementing breeding formula
   - API routes for breeding operations
   - TypeScript interfaces for breeding data
3. Initialized `frontend/` with React + Vite:
   - Basic breeding calculator UI
   - Parent selection dropdowns
   - Result display component
4. Added `package.local.json` for custom development scripts

### Documentation Structure (Completed)
- Created CLAUDE.md files in all major directories
- Documented existing codebase without modifications
- Established non-invasive architecture pattern
- ✅ Set up memory bank structure

### Breeding Calculator Architecture (Completed)
- Designed comprehensive breeding optimization system
- Documented in `memory-bank/breeding-calculator/`:
  - `architecture.md`: Technical design and algorithms
  - `features.md`: Detailed feature specifications
  - `optimization-logic.md`: Universal optimization for minimum expected breeding attempts
  - `breeding-mechanics-confirmed.md`: Research-backed breeding mechanics
  - `api-endpoints.md`: Existing and required API documentation
  - `gender-probability-data.md`: Impact of gender ratios on breeding
  - `summary.md`: High-level overview
- Key architectural decisions:
  - Local storage for Pal box management
  - Pal-focused UI (gender secondary, passives optional)
  - **Universal optimization principle**: ALWAYS minimize expected breeding attempts
  - Gender probabilities factor into ALL calculations
  - Passives add multiplication factor to expected attempts
  - Advanced passive optimization: prefers complementary parent sets
  - Chain breeding recognition for gradual passive accumulation
  - Breeding-first approach (catching as last resort)
  - Visual breeding tree components

## Next Steps

### Immediate Tasks (Phase 1 - MVP)
1. Implement Pal Box Management
   - Add/Edit/Delete owned Pals
   - Local storage persistence
   - Basic UI with grid view
2. Enhance breeding calculator
   - Add passive inheritance probabilities
   - Show owned vs. needed Pals
3. Create single-target optimizer
   - Basic pathfinding algorithm
   - Probability calculations

### Near-term Goals
1. Multi-generation breeding path calculator
2. Visual breeding tree component
3. Improved UI/UX with better Pal selection
4. Performance optimizations for large breeding chains

## Active Decisions and Considerations

### Architecture Decisions
- **Wrapper Server Pattern**: Chosen to avoid modifying original files
- **Separate Directories**: Keeps fork clean and syncable
- **Shared Type Definitions**: Reuse original interfaces where possible

### Technical Considerations
- **Breeding Data Source**: Using existing breeding.json and formula
- **Special Combinations**: Hardcoded in calculator.ts (40+ pairs)
- **API Design**: RESTful endpoints under `/api/breeding/*`
- **Frontend Framework**: React chosen for familiarity and ecosystem

## Important Patterns and Preferences

### Code Organization
- Keep all custom code outside of `src/`
- Use TypeScript for type safety
- Follow existing code style from original API

### Development Workflow
- Test changes with both original and extended APIs
- Ensure original API remains functional
- Document significant changes in CLAUDE.md files

### Fork Maintenance
- Never modify original source files
- Keep changes isolated to new directories
- Regular upstream sync capability is critical

## Learnings and Project Insights

### Breeding System Insights
1. Breeding uses a rank-based system (1-1500)
2. Standard formula: `floor((parentA_rank + parentB_rank + 1) / 2)`
3. Special combinations override the standard formula
4. Some Pals can only be obtained through specific breeding
5. **Passive Inheritance is Probabilistic**:
   - 46% chance per passive to inherit (slightly higher from male parent)
   - 33% chance of inheriting NO passives
   - Can inherit 0-4 passives randomly from parents
   - Empty slots can get random passives
6. **Gender Probabilities Matter**:
   - Each Pal has specific male/female probability
   - Some Pals are heavily skewed (87.5%/12.5%)
   - This affects expected breeding attempts significantly
   - Optimizer must consider gender RNG even without passives

### Technical Insights
1. Bun + ElysiaJS provides excellent performance
2. Static JSON files are sufficient for data storage
3. Elasticlunr search works well for Pal data
4. React Query simplifies frontend data fetching

### User Needs
- Visual feedback is important (Pal images)
- Quick calculations are the primary use case
- Future features should focus on optimization and planning