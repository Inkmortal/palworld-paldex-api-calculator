# Progress

## What Works

### Original API (Preserved) ✅
- GET / endpoint with full search and filtering
- Elasticlunr full-text search
- Pagination support
- Query parameters: page, limit, term, name, types, suitability, drops, key
- Static file serving for images

### Extended Architecture ✅
- Wrapper server combining all functionality
- Non-invasive fork structure maintained
- Original API proxied at /api/v1/*
- Custom code isolated in separate directories

### Breeding API ✅
- GET /api/breeding/calculate - Calculate offspring from two parents
- GET /api/breeding/combinations/{palId} - Get all parent combinations
- GET /api/breeding/pals - Get breeding-optimized Pal data
- Breeding formula implementation
- Special combinations handling (40+ pairs)

### Frontend Foundation ✅
- React + Vite setup with TypeScript
- Basic breeding calculator UI
- Parent selection dropdowns
- Result display with Pal images
- Tailwind CSS styling
- React Query for data fetching

### Documentation ✅
- CLAUDE.md files in all major directories
- Memory bank structure created
- Comprehensive project documentation
- Breeding calculator architecture documented
- Feature specifications complete
- **Optimization logic clarified**: System ALWAYS minimizes expected breeding attempts
  - Without passives: Considers gender probabilities only
  - With passives: Adds passive inheritance as multiplication factor
  - Universal formula: TotalExpectedAttempts = Σ(GenderAttempts × PassiveAttempts)

## What's Left to Build

### Breeding Calculator Features (Phase 1 - MVP)
1. **Pal Box Management** 🔲
   - Add/Edit/Delete owned Pals interface
   - Local storage persistence
   - Gender and passive skill tracking
   - Grid view with filtering

2. **Enhanced Breeding Calculator** 🔲
   - Passive inheritance probability display
   - Owned vs. needed Pal indicators
   - Expected breeding attempts calculation

3. **Single Target Optimizer** 🔲
   - Pathfinding from owned Pals to target
   - Passive skill probability calculations
   - Missing Pal requirements

### Phase 2 Features
1. **Multi-Target Optimization** 🔲
   - Optimize for multiple targets simultaneously
   - Shared intermediate identification
   - Breeding sequence optimization

2. **Visual Breeding Tree** 🔲
   - Interactive node-based visualization
   - Color-coded ownership status
   - Drag/pan/zoom functionality

3. **Advanced Passive System** 🔲
   - Monte Carlo simulation for probabilities
   - Passive combination recommendations
   - Success rate predictions

### UI/UX Improvements
1. **Better Pal Selection** 🔲
   - Image previews in dropdowns
   - Type indicators
   - Favorites/recently used

2. **Mobile Optimization** 🔲
   - Responsive design improvements
   - Touch-friendly controls
   - Progressive web app features

3. **Dark Mode** 🔲
   - Theme toggle
   - Persistent preference
   - Appropriate color schemes

### API Enhancements
1. **Breeding Chain Endpoint** 🔲
   - POST /api/breeding/chain
   - Multi-generation path calculation
   - Resource optimization

2. **Passive Skills API** 🔲
   - GET /api/breeding/skills
   - Inheritance calculations
   - Skill combination probabilities

3. **Batch Operations** 🔲
   - Calculate multiple breeding pairs
   - Bulk combination lookups

## Current Status

### Active Development
- Documentation complete with optimization logic clarified ✅
- Ready to begin Phase 1 implementation:
  - Pal Box Management UI
  - Enhanced breeding calculator
  - Single-target optimizer

### Blocked/Waiting
- None currently

### Technical Debt
- Frontend needs component extraction for reusability
- API error handling could be more robust
- Missing comprehensive tests

## Known Issues

### Minor Issues
1. Frontend dropdowns don't show Pal images (enhancement)
2. No loading states for initial data fetch
3. Mobile layout needs optimization

### Resolved Issues
- ~~Original API modification concern~~ → Solved with wrapper pattern
- ~~Fork synchronization~~ → Achieved with directory isolation

## Evolution of Project Decisions

### Architecture Evolution
1. **Initial Concern**: How to add features without modifying original
2. **Exploration**: Considered separate services, git branches
3. **Solution**: Wrapper server pattern with directory isolation
4. **Result**: Clean, maintainable, syncable fork

### Technology Choices
1. **Frontend Framework**: Chose React for ecosystem and familiarity
2. **Build Tool**: Vite for speed and modern features
3. **Styling**: Tailwind for rapid development
4. **State Management**: React Query for server state

### Feature Prioritization
1. **MVP**: Basic breeding calculator (completed)
2. **Next**: Passive skills and breeding chains
3. **Future**: Advanced visualizations and optimizations

## Metrics & Milestones

### Completed Milestones
- ✅ Fork architecture design
- ✅ Basic breeding API
- ✅ Frontend foundation
- ✅ Memory bank setup
- ✅ Comprehensive documentation with optimization logic

### Upcoming Milestones
- 🔲 Passive skill inheritance system
- 🔲 Multi-generation breeding paths
- 🔲 Enhanced UI/UX
- 🔲 Community feedback integration

### Success Metrics
- API response time: Currently < 50ms ✅
- Frontend bundle size: ~200KB gzipped ✅
- User feedback: Pending initial release