# Breeding Calculator Architecture

## Overview
A comprehensive breeding optimization tool that helps players manage their Pal collection and find optimal breeding paths to target Pals with desired passive skills.

## Core Features

### 1. Pal Box Management
Local storage-based inventory system for tracking owned Pals.

#### Data Model
```typescript
interface OwnedPal {
  id: string;                    // UUID for this instance
  palKey: string;                // Reference to pals.json (e.g., "001")
  nickname?: string;             // Optional custom name
  gender: 'male' | 'female';
  passives: string[];            // Array of passive skill keys (0-4)
  dateAdded: string;             // ISO timestamp
}

interface PalBox {
  ownedPals: OwnedPal[];
  lastUpdated: string;
}
```

#### Features
- Add/Edit/Delete Pals
- Filter by type, gender, passives
- Visual grid view with Pal images
- Bulk import/export for backup

### 2. Breeding Analysis System

#### Generation Categories
- **Gen 0**: Currently owned Pals
- **Gen 1**: Direct offspring from owned Pals
- **Gen 2+**: Pals requiring intermediate breeding steps

#### Breeding Possibility Analysis
```typescript
interface BreedingPossibility {
  generation: number;
  parent1: OwnedPal | RequiredPal;
  parent2: OwnedPal | RequiredPal;
  offspring: {
    palKey: string;
    possiblePassives: PassiveInheritance[];
    genderProbability: { male: number; female: number };
  };
  breedingPath?: BreedingStep[]; // For Gen 2+
}

interface PassiveInheritance {
  passive: string;
  probability: number;
  sources: Array<'parent1' | 'parent2' | 'random'>;
}

interface BreedingStep {
  parent1: OwnedPal | RequiredPal;
  parent2: OwnedPal | RequiredPal;
  offspring: {
    palKey: string;
    genderNeeded?: 'male' | 'female'; // For next breeding step
    genderProbability: { male: number; female: number };
  };
  expectedAttempts: number; // Based on gender requirements
  passiveGoals?: string[]; // If breeding for specific passives
}
```

### 3. Three-Tab Interface

#### Tab 1: Pal Box Manager
- **Purpose**: Manage owned Pal inventory
- **Components**:
  - PalGrid with cards showing image, gender, passives
  - AddPalModal with dropdown selectors
  - QuickStats showing breeding potential
  - Import/Export functionality

#### Tab 2: General Breeding Calculator
- **Purpose**: Explore all breeding possibilities
- **Features**:
  - Standard parent selector (all Pals)
  - Visual breeding tree
  - Availability indicators:
    - ✅ Green: Both parents owned
    - 🟡 Yellow: One parent owned
    - ❌ Red: Neither parent owned
  - Passive inheritance probability display

#### Tab 3: Target Optimization Engine
- **Purpose**: Find optimal paths to breed target Pals
- **Features**:
  - Multi-target selection
  - Passive skill requirements per target
  - Optimal path calculation
  - Missing Pal requirements
  - Success probability estimates

## Optimization Algorithm

### Core Algorithm: Expected Value Optimization

```typescript
interface OptimizationRequest {
  targets: Array<{
    palKey: string;
    requiredPassives?: string[]; // Optional - when provided, changes optimization
  }>;
  ownedPals: OwnedPal[];
  optimizationStrategy: 'min_steps' | 'breed_priority' | 'balanced';
}

interface OptimizedPath {
  target: string;
  targetPassives: string[];
  totalSteps: number;
  totalCakes: number;
  breedingChain: BreedingStep[];
  alternativePaths: BreedingStep[][];
  requiredCatches: RequiredPal[]; // Only Pals that MUST be caught
}
```

### Optimization Algorithm Details

#### Without Passive Requirements
When no passives are selected, the algorithm optimizes for **expected total breeding attempts**:
1. Calculates expected attempts for each path considering:
   - Number of breeding steps
   - Gender probability at each step (if specific gender needed)
   - Example: 2 steps with 50% gender need = 2 attempts expected
   - Example: 1 step with 12.5% gender need = 8 attempts expected
2. Prioritizes using owned Pals over catching
3. Selects path with lowest expected total attempts

#### With Passive Requirements (Advanced Optimization)
When passives ARE selected, the algorithm fundamentally changes:
1. **Calculates passive inheritance probabilities** for each potential path
2. **Weights paths** based on likelihood of getting desired passives
3. **Prefers paths where**:
   - Parents already have the required passives
   - Male parents have critical passives (50.6% vs 46% rate) 
   - Note: This is about which parent HAS the passive, not which specific Pal is male/female
   - Fewer breeding steps are needed while maintaining good odds
4. **Outputs the path** with best success probability

Example internal calculation:
- Path A: 3 steps, 65% chance of target passives
- Path B: 2 steps, 15% chance of target passives
- Algorithm chooses Path A despite being longer

#### Gender Branching
When a Pal is needed in both genders for future breeding:
```
Parent A + Parent B → Target
                      ├── ♂️ (for path 1)
                      └── ♀️ (for path 2)
```
The algorithm accounts for gender probability ratios when planning paths.

### Multi-Target Optimization
```typescript
interface MultiTargetOptimization {
  individualPaths: Map<string, OptimizedPath>;
  sharedIntermediates: Array<{
    palKey: string;
    usedInPaths: string[]; // target pal keys
    breedingRequirements: BreedingStep;
  }>;
  optimizedSequence: BreedingStep[]; // Ordered to maximize reuse
  totalUniqueCakes: number;
}
```

## Passive Inheritance Calculator (Internal)

### Probability Calculation Engine
```typescript
// This runs internally to score breeding paths when passives are selected
interface PassivePathScoring {
  scorePath(
    breedingChain: BreedingStep[],
    targetPassives: string[]
  ): {
    pathScore: number;        // 0-1, used for optimization
    criticalSteps: number[];  // Which steps are passive bottlenecks
  };
  
  // Factors considered:
  // - Parent passive availability at each step
  // - Gender of parents with critical passives
  // - Cumulative probability through the chain
  // - Number of "retry points" if passives don't inherit
}

// Constants based on game data (used internally)
const PASSIVE_INHERITANCE_RATE = 0.46;
const MALE_PARENT_BONUS = 1.1; // Male parents have ~50.6% rate
const NO_PASSIVE_INHERITANCE_CHANCE = 0.33;
```

### Path Selection Logic
When passives are selected, the optimizer:
1. Generates all possible paths to target
2. Scores each path based on passive inheritance likelihood
3. Selects the path with best score
4. Presents it as simple breeding steps (hiding the probability math)

## Visual Components

### Breeding Tree Visualization
```typescript
interface BreedingTreeNode {
  id: string;
  palKey: string;
  palData: {
    name: string;
    image: string;
    types: string[];
  };
  position: { x: number; y: number };
  ownership: 'owned' | 'can_breed' | 'need_to_catch';
  gender?: 'male' | 'female' | 'either';
  passives?: string[];
  connections: {
    parent1?: string; // node id
    parent2?: string; // node id
    children: string[]; // node ids
  };
}
```

### Visual Design
- **Node Colors**:
  - Green border: Owned Pal
  - Yellow border: Can breed now
  - Red border: Need to acquire
  - Blue highlight: Critical path
- **Node Contents**:
  - Pal image
  - Gender icon
  - Passive skill badges
  - Ownership indicator
- **Interactions**:
  - Click: Show details
  - Hover: Highlight breeding path
  - Drag: Pan view
  - Scroll: Zoom

## Data Persistence

### LocalStorage Schema
```typescript
interface LocalStorageData {
  version: string; // For migration support
  palBox: {
    ownedPals: OwnedPal[];
    lastUpdated: string;
  };
  settings: {
    defaultOptimizationStrategy: string;
    showProbabilities: boolean;
    compactView: boolean;
  };
  savedPlans: Array<{
    id: string;
    name: string;
    created: string;
    targets: TargetPal[];
    path: OptimizedPath;
  }>;
}
```

## API Endpoints (New)

### Breeding Optimization
```
POST /api/breeding/optimize
Body: {
  targets: Array<{palKey: string, passives: string[]}>,
  ownedPals: Array<{palKey: string, gender: string, passives: string[]}>,
  strategy: 'min_steps' | 'max_probability' | 'balanced'
}
Response: OptimizedPath
```

### Passive Inheritance Calculation
```
POST /api/breeding/passive-inheritance
Body: {
  parent1: {passives: string[], gender: string},
  parent2: {passives: string[], gender: string},
  desiredPassives: string[]
}
Response: PassiveInheritanceProbabilities
```

### Breeding Possibilities
```
POST /api/breeding/possibilities
Body: {
  ownedPals: Array<{palKey: string, gender: string}>,
  maxGeneration: number
}
Response: Array<BreedingPossibility>
```

## Performance Considerations

### Optimization Limits
- Maximum 5 targets for multi-target optimization
- Maximum 4 generations depth for breeding paths
- Cache common breeding calculations
- above are recommended limits, but really should allow user to go beyond limits

### Data Management
- Lazy load Pal images
- Virtualize large lists
- Debounce search/filter operations

## Future Enhancements
1. **Breeding Simulator**: Run Monte Carlo simulations for passive inheritance
2. **Community Sharing**: Share breeding plans with other players
3. **Market Integration**: If game adds trading, optimize for market availability
4. **IV/EV Support**: If game reveals these mechanics