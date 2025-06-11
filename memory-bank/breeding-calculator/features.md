# Breeding Calculator Features Specification

## Feature 1: Pal Box Management

### User Stories
- As a player, I want to track my owned Pals with their gender and passives
- As a player, I want to quickly see what breeding options I have
- As a player, I want to backup and restore my Pal collection

### Functionality

#### Add Pal
1. Click "Add Pal" button
2. Select Pal from dropdown (with search)
3. Select gender (Male/Female)
4. Select up to 4 passive skills from available list
5. Optionally add nickname
6. Save to local storage

#### Edit Pal
1. Click edit icon on Pal card
2. Modify gender, passives, or nickname
3. Cannot change Pal species (must delete and re-add)
4. Save changes

#### Delete Pal
1. Click delete icon on Pal card
2. Confirm deletion modal
3. Remove from local storage

#### Bulk Operations
- Import JSON file with Pal data
- Export current collection as JSON
- Select multiple for bulk delete

### UI Components
```
┌─────────────────────────────────────────┐
│ Pal Box Manager                    [+]  │
├─────────────────────────────────────────┤
│ Search: [___________] Filter: [▼]       │
├─────────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│ │ IMG │ │ IMG │ │ IMG │ │ IMG │       │
│ │ ♂️  │ │ ♀️  │ │ ♂️  │ │ ♀️  │       │
│ │ P1  │ │ P1  │ │ P1  │ │ P1  │       │
│ │ P2  │ │ P2  │ │ P2  │ │ P2  │       │
│ └─────┘ └─────┘ └─────┘ └─────┘       │
└─────────────────────────────────────────┘
```

## Feature 2: Breeding Possibilities Viewer

### Generation System
- **Gen 0**: Your owned Pals
- **Gen 1**: Direct breeding from owned Pals
- **Gen 2**: Requires one intermediate breeding step
- **Gen 3+**: Multiple intermediate steps

### Breeding Tree Display
```
Lamball (♂️) + Cattiva (♀️)
         │
         ├── Chikipi (50% ♂️ / 50% ♀️)
         │   └── Can breed further to:
         │       ├── Teafant (needs ♀️ Chikipi + Pengullet)
         │       └── Fuack (any gender + Mau)
         │
         └── Lifmunk (70% ♂️ / 30% ♀️) ⚠️
             └── Can breed further to:
                 ├── Foxparks (needs ♀️ Lifmunk + Pengullet)
                 └── Hoocrates (any gender + Killamari)

Legend:
⚠️ = Gender ratio may affect breeding attempts
```

When passives are relevant:
```
Lamball (♂️) + Cattiva (♀️)
[Legend, Swift]   [Lucky]
         │
         └── Chikipi 
             Available passives: Legend, Swift, Lucky
             (Breed until desired combination)
```

### Interactive Features
- Click on any Pal to see detailed breeding paths
- Filter by:
  - Specific target Pal
  - Available passives
  - Generation distance
  - Gender requirements
- Color coding for availability
- Export breeding tree as image

## Feature 3: Target Pal Optimizer

### Single Target Mode

#### Input
1. Select target Pal from dropdown
2. (Optional) Select desired passives (0-4)
3. Click "Find Optimal Path"

#### Output (Without Passives)
```
Target: Anubis

Breeding Path:
┌────────────────────────────────────────────┐
│ Step 1: Penking (♂️) + Bushi (♀️) → Anubis │
│                                            │
│ Required Catches: None! ✓                  │
└────────────────────────────────────────────┘
```

#### Output (With Passive Requirements)
```
Target: Anubis with Legend, Lucky, Musclehead

Breeding Path:
┌────────────────────────────────────────────┐
│ Step 1: Relaxaurus (♂️) + Sparkit (♀️)     │
│         → Relaxaurus Lux (need ♂️)         │
│                                            │
│ Step 2: Relaxaurus Lux (♂️) + Mossanda (♀️)│
│         → Mossanda Lux (need ♀️)           │
│                                            │
│ Step 3: Penking (♂️) + Mossanda Lux (♀️)   │
│         → Anubis                           │
│         Passives: Legend, Lucky, Musclehead│
│                                            │
│ Required Catches: None! ✓                  │
└────────────────────────────────────────────┘
```

### Multi-Target Mode

#### Input
1. Add multiple targets (up to 5)
2. Set passives for each target
3. Choose optimization priority:
   - Minimize total breeding steps
   - Maximize shared intermediates
   - Balance efficiency and probability

#### Output
```
Targets: Anubis, Faleris, Orserk

Optimized Breeding Sequence:
┌────────────────────────────────────────────┐
│ Shared Intermediates:                      │
│ 1. Mossanda (♂️) + Grizzbolt (♀️) → Orserk ✓│
│                                            │
│ 2. Penking (♂️) + Bushi (♀️) → Anubis ✓    │
│                                            │
│ 3. Vanwyrm (♂️) + Anubis (♀️) → Faleris ✓  │
│    (Uses Anubis from step 2)              │
│                                            │
│ Total: 3 breeding operations               │
│ Required Catches: None!                    │
└────────────────────────────────────────────┘
```

#### Output (With Some Passive Requirements)
```
Targets: Anubis, Faleris (Swift), Orserk (Musclehead, Artisan)

Optimized Breeding Sequence:
┌────────────────────────────────────────────┐
│ 1. Mossanda (♂️) + Grizzbolt (♀️) → Orserk │
│    Need: ♂️ with Musclehead, Artisan       │
│                                            │
│ 2. Penking (♂️) + Bushi (♀️) → Anubis ✓    │
│                                            │
│ 3. Vanwyrm (♂️) + Anubis (♀️) → Faleris    │
│    Need: Either gender with Swift          │
│                                            │
│ Total: 3 breeding operations               │
│ Required Catches: None!                    │
└────────────────────────────────────────────┘
```

### Visual Path Display
- Interactive flow diagram
- Nodes show:
  - Pal image and name
  - Gender requirement
  - Current/required passives
  - Ownership status
- Edges show:
  - Breeding probability
  - Passive inheritance chance
  - Number of attempts needed

## Feature 4: Passive Skill Management

### Passive Skill Overview
```
Parent 1 (♂️)        Parent 2 (♀️)
- Legend           - Lucky
- Musclehead       - Swift
- Ferocious        - Workaholic

Breeding Goal: Legend, Lucky, Musclehead, Ferocious

Available Passives:
┌─────────────────────────────────┐
│ ✓ Legend (from ♂️)              │
│ ✓ Lucky (from ♀️)               │
│ ✓ Musclehead (from ♂️)          │
│ ✓ Ferocious (from ♂️)           │
│ • Swift (from ♀️)               │
│ • Workaholic (from ♀️)          │
│                                 │
│ Status: All desired passives    │
│ available. Breed until you get  │
│ the combination you want.       │
└─────────────────────────────────┘
```

### Passive Filter System
- Show only Pals with specific passives
- Highlight exclusive passives (Legend, Lucky, etc.)
- Track passive availability in your box

## Feature 5: Missing Pal Advisor

### Catch Requirements (Last Resort)
When no breeding path exists:

```
Cannot breed from current collection:
┌────────────────────────────────────┐
│ Required Catches:                  │
│                                    │
│ 1. Jormuntide (Water/Dragon)       │
│    Need: Either gender             │
│    Location: Boss fight            │
│    Alternative: None available     │
│                                    │
│ Why needed: Only source for        │
│ dragon/water combination in your   │
│ breeding chain to Jormuntide Ignis │
└────────────────────────────────────┘
```

### Smart Breeding Prioritization
- Always check if target can be bred from owned Pals
- Look for multi-generation paths before suggesting catches
- Only suggest catching when absolutely no breeding path exists
- Explain WHY a catch is necessary when suggested

## Feature 6: Breeding Calculator Settings

### User Preferences
```typescript
interface UserSettings {
  // Display
  compactMode: boolean;
  showProbabilities: boolean;
  
  // Calculation
  defaultOptimizationMode: 'speed' | 'probability' | 'balanced';
  minAcceptablePassiveProbability: number; // 0-1
  maxBreedingGenerations: number; // 2-5
  
  // Advanced
  considerGenderRatios: boolean;
  preferCommonPals: boolean;
  allowLowProbabilityPaths: boolean;
}
```

## Implementation Priority

### Phase 1 (MVP)
1. Pal Box Management (add, edit, delete)
2. Basic breeding calculator
3. Simple target optimizer (single target)

### Phase 2
1. Multi-target optimization
2. Visual breeding trees
3. Passive probability calculations

### Phase 3
1. Missing Pal advisor
2. Import/export functionality
3. Advanced filtering and search

### Phase 4
1. Breeding plan saving
2. Statistics and analytics
3. Community features (share plans)