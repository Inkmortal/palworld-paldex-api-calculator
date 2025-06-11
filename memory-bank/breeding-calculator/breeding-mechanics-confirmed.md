# Confirmed Palworld Breeding Mechanics

## Key Findings from Research

### 1. Passive Inheritance Rates (Confirmed)
- **46% base inheritance rate** per passive skill
- **Male parent bonus**: Passives from male parent have slightly higher inheritance chance
- **33% chance** of inheriting NO passives at all
- Can inherit 0-4 passives from parent pool

### 2. Optimal Parent Configuration
**Best Practice**: Use parents with **different** passive sets rather than identical ones
- Parent 1: Passives A, B
- Parent 2: Passives C, D
- Better than both parents having A, B, C, D

**Reason**: Increases chances of desired combinations and reduces overlap

### 3. Inheritance Probability Math
When parents have >4 unique passives combined:
- Game picks 1-4 skills from all combinations equally
- Example: 6 unique skills total = 1/15 chance for specific 4 skills

### 4. Chain Breeding Strategy (Confirmed Best Practice)
1. Start with Pals having 1-2 desired skills each
2. Breed to combine skills gradually
3. Use offspring as parents for next generation
4. Continue until achieving perfect 4-skill combination

### 5. Important Considerations
- **RNG Factor**: Players report 60+ eggs for perfect combinations
- **Skill Stacking**: Compatible stat buffs stack
- **Contradictory Skills**: Some skills cancel each other out
- **Exclusive Skills**: Some passives (like Legend) can be inherited to any Pal

## Optimization Algorithm Improvements

Based on this research, our optimizer should:

### 1. Parent Selection Strategy
```
When breeding for passives:
- Prefer parents with complementary (non-overlapping) passive sets
- Avoid parents with duplicate passives
- Consider total unique passive count (lower is better)
```

### 2. Path Scoring Adjustments
```
Better path scoring:
- 2 parents with 2 passives each > 2 parents with 4 passives each
- 3 total desired passives > 4 total desired passives (higher success rate)
- Male parent with key passives > Female parent with key passives
```

### 3. Chain Breeding Recognition
The optimizer should identify when chain breeding is more efficient:
- Instead of trying to get 4 passives in one generation
- Build up passives over 2-3 generations
- Each step has higher success probability

### 4. User Guidance
When showing breeding paths:
- Indicate which passives to aim for at each step
- Show why certain parent combinations are chosen
- Suggest "checkpoint" Pals to keep for future breeding

## Example Optimization

**Goal**: Anubis with Legend, Lucky, Swift, Ferocious

**Poor Strategy** (what to avoid):
- Parent 1: Legend, Lucky, Swift, Ferocious, Artisan, Serious
- Parent 2: Legend, Lucky, Swift, Ferocious, Workaholic, Runner
- Problem: 8 unique skills = very low success rate

**Optimal Strategy** (what our algorithm should find):
1. Breed Pal A (Legend, Artisan) + Pal B (Lucky, Serious) → Child 1 (Legend, Lucky)
2. Breed Pal C (Swift, Runner) + Pal D (Ferocious, Brave) → Child 2 (Swift, Ferocious)  
3. Breed Child 1 + Child 2 → Target (Legend, Lucky, Swift, Ferocious)

Each step has much higher success rate due to fewer total passives in play.