# Breeding Calculator Summary

## Project Vision
Create a comprehensive breeding optimization tool that helps Palworld players manage their Pal collection and find the most efficient paths to breed target Pals with desired passive skills.

## Key Features

### 1. Pal Box Manager
- Track owned Pals with gender and passive skills
- Local storage persistence
- Visual grid interface
- Import/export functionality

### 2. Breeding Analysis
- Show all possible breeding outcomes by generation
- Display which Pals you can breed immediately
- Show multi-generation breeding paths
- Identify what Pals you need to catch (last resort)

### 3. Target Optimization Engine
- Find optimal breeding paths to specific Pals
- Support multiple targets simultaneously
- Show exact breeding steps with gender requirements
- Optional passive skill targeting
- Prioritize breeding from owned collection

## Technical Highlights

### Architecture
- Non-invasive extension of existing API
- Local storage for user data
- React frontend with visual breeding trees
- New API endpoints for optimization calculations

### Key Algorithms
- **Expected Value Optimization**: Always calculates expected breeding attempts based on gender probabilities
- **Without passives**: Optimizes for fewest total attempts considering gender RNG
- **With passives**: Advanced multi-factor optimization:
  - Prefers complementary parent passive sets (no overlap)
  - Recognizes chain breeding opportunities (gradual buildup)
  - Weights male parents higher for key passives
  - Calculates success based on total unique passives
- **Smart Path Selection**: May choose longer paths for higher success probability
- **Multi-target optimization**: Identifies shared intermediates to minimize total breeding

### User Experience
- Three-tab interface: Box Manager, General Calculator, Target Optimizer
- Visual breeding trees with ownership indicators
- Probability displays for informed decisions
- Preference for common Pals in catch recommendations

## Implementation Phases

### Phase 1 (MVP)
- Basic Pal box management
- Enhanced breeding calculator with probabilities
- Single-target optimization

### Phase 2
- Multi-target optimization
- Visual breeding tree component
- Advanced passive calculations

### Phase 3
- Missing Pal advisor with rarity considerations
- Import/export and backup features
- Advanced filtering

### Phase 4
- Breeding plan saving and sharing
- Statistics and analytics
- Community features

## Critical Design Decisions

1. **Pal-Focused, Not Passive-Focused**: Primary goal is showing WHICH Pal to breed at each step. Gender requirements are secondary. Passives are optional.

2. **Breeding First, Catching Last**: Always prioritize breeding from owned Pals. Only suggest catching when no breeding path exists.

3. **Clear Action Steps**: Show exact breeding combinations with clear outcomes: "Breed A + B → C"

4. **Visual Focus**: Breeding trees and visual indicators make complex paths understandable

5. **Local First**: All user data stored locally to avoid backend complexity

## Success Metrics
- Help players achieve desired breeding outcomes faster
- Minimize total breeding attempts by considering gender probabilities
- Enable complex multi-target breeding strategies
- Provide clear visual understanding of breeding paths
- Save players time by avoiding paths with rare gender requirements