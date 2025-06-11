# Project Brief

## Project Name
Palworld Paldex API Calculator

## Core Purpose
Extend the first Palworld API with a comprehensive breeding calculator frontend and additional breeding-specific API endpoints while maintaining fork synchronization with the upstream repository.

## Primary Goals
1. **Preserve Original API**: Keep the original Palworld Paldex API completely untouched
2. **Add Breeding Calculator**: Create a web-based tool for calculating breeding outcomes
3. **Extend API**: Add breeding-specific endpoints without modifying original code
4. **Maintain Fork Sync**: Enable easy updates from upstream repository

## Key Requirements
1. **Non-Invasive Architecture**: All custom code must be in separate directories
2. **Unified Application**: Single server serving both API and frontend
3. **Breeding Logic**: Implement accurate breeding calculations based on game mechanics
4. **User Interface**: Intuitive breeding calculator with parent selection and results display

## Technical Constraints
1. Cannot modify any files in the original `src/` directory
2. Must use the existing data files (pals.json, breeding.json, etc.)
3. Should leverage existing TypeScript interfaces where possible
4. Must be compatible with Bun runtime and ElysiaJS framework

## Success Criteria
1. Original API continues to work at `/api/v1`
2. Breeding API provides accurate calculations at `/api/breeding`
3. Frontend allows easy breeding calculations
4. Fork can be synced with upstream without conflicts
5. All functionality runs from a single server on port 8080

## Scope Boundaries
### In Scope
- Breeding calculations (standard formula and special combinations)
- Parent selection interface
- Breeding result display
- API endpoints for breeding operations
- Future: Passive skill inheritance, breeding chains

### Out of Scope
- Modifying original API functionality
- Game data updates (uses existing JSON files)
- Authentication/user accounts
- Real-time multiplayer features