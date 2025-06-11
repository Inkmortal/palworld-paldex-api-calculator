# Breeding Optimization Logic

## Core Optimization Principle

The breeding calculator ALWAYS optimizes for the **minimum expected total breeding attempts**, regardless of whether passives are selected.

### 1. Basic Optimization (No Passives Selected)
- Find path with lowest expected breeding attempts
- Account for gender probabilities when specific genders needed
- Prioritize breeding over catching
- Output: Simple step-by-step breeding instructions

#### Gender Probability Impact
Breeding always requires 1 male + 1 female parent (the specific gender assignment doesn't affect outcome).
Gender ratios only matter when you need a specific gender for future breeding:

Example scenario - You have Relaxaurus (♂️) and need Anubis (♀️) to breed with it:
- Anubis has 50/50 gender ratio = 2 expected attempts to get ♀️
- If Anubis had 70% ♂️ / 30% ♀️ = 3.3 expected attempts to get ♀️

Example optimization:
- Path A: Get Mammorest (87.5% ♂️ / 12.5% ♀️), need ♀️ = ~8 attempts
- Path B: Get Mossanda (50/50), need ♀️ = ~2 attempts
- **Algorithm chooses Path B** when female needed

### 2. Advanced Optimization (With Passives Selected)
When passives are selected, we STILL optimize for minimum expected breeding attempts, but now include passive inheritance probability in the calculation:

#### Internal Process
1. **Path Generation**: Find all possible breeding paths to target
2. **Expected Attempts Calculation**: For each path:
   - Base attempts = gender probability factor (same as basic optimization)
   - Passive factor = 1 / (probability of getting desired passives)
   - Total expected attempts = base attempts × passive factor
3. **Parent Configuration Analysis**: 
   - Complementary passives (no overlap) = higher success rate = fewer attempts
   - Example: 2 parents with 2 passives each = ~25% success
   - Example: 2 parents with 4 passives each = ~6% success (4x more attempts!)
4. **Chain Breeding Recognition**: 
   - Multi-generation with 80% success each step = fewer total attempts
   - Than single generation with 10% success
5. **Path Selection**: Choose path with LOWEST expected total attempts
6. **Output Formatting**: Present as clean breeding steps with passive goals

#### Example Scenario
User wants: Anubis with Legend, Lucky, Musclehead

**Path A** (Direct approach):
- Penking + Bushi → Anubis
- Gender attempts: 1 (no specific gender needed after)
- Passive success: ~5% (parents have 6+ unique passives)
- **Total expected attempts: 1 × 20 = 20 attempts**

**Path B** (Chain breeding):
- Step 1: Pal A (Legend) + Pal B (Lucky) → Child 1 (50% success)
- Step 2: Child 1 + Pal C (Musclehead) → Child 2 (40% success)  
- Step 3: Penking + Child 2 → Anubis (80% success)
- Gender attempts: 3 (assuming 50/50 ratios)
- **Total expected attempts: 2 + 2.5 + 1.25 = 5.75 attempts**

**Algorithm chooses Path B** because 5.75 < 20 expected attempts!

### 3. Gender Branching Logic

When a Pal is needed in multiple genders:
```
Step 1: Mossanda + Grizzbolt → Orserk
                                ├── ♂️ (for Path A: Orserk + Petallia → Target1)
                                └── ♀️ (for Path B: Relaxaurus + Orserk → Target2)
```

The optimizer will:
- Show the initial breeding step once
- Branch the tree to show both genders needed
- Calculate separate paths for each gender requirement

## Implementation Notes

### Path Scoring Formula (Universal)

```
TotalExpectedAttempts = Σ(StepAttempts) for all steps in path

Where StepAttempts = GenderAttempts × PassiveAttempts

GenderAttempts =
  - 1 if no specific gender needed for next step
  - 1 / GenderProbability if specific gender needed

PassiveAttempts = 
  - 1 if no passives required
  - 1 / PassiveSuccessProbability if passives required
  
PassiveSuccessProbability depends on:
  - Total unique passives in parent pool
  - Which parent has desired passives (male = 50.6%, female = 46%)
  - Number of desired passives (fewer = higher success)
```

#### Example Calculations

**No Passives:**
- Step needs ♀️ with 30% rate = 3.33 attempts
- No passive requirement = 1
- Total: 3.33 × 1 = 3.33 attempts

**With Passives:**
- Step needs any gender = 1 attempt  
- Passive success rate = 25% = 4 attempts
- Total: 1 × 4 = 4 attempts

**Both Factors:**
- Step needs ♀️ with 12.5% rate = 8 attempts
- Passive success rate = 50% = 2 attempts  
- Total: 8 × 2 = 16 attempts

The algorithm ALWAYS minimizes total expected attempts!

### User Interface Principles
1. **Never show probabilities** - Users understand RNG exists
2. **Focus on actions** - "Breed A + B → C"
3. **Show passive availability** - Simple note when passives are present
4. **Indicate gender needs** - Only when it affects the breeding chain

## Edge Cases

### No Path Exists
- Happens when target requires specific Pals not in collection
- Algorithm suggests minimal catches needed
- Explains why catching is necessary

### Multiple Optimal Paths
- When paths have similar success rates
- Show primary path with option to view alternatives
- Let user choose based on what they have available

### Circular Dependencies
- Some breeding chains require the target as an intermediate
- Algorithm detects and suggests catching one instance
- Example: Some paths to Anubis variants require base Anubis