# Gender Probability Impact on Breeding

## Why Gender Probabilities Matter

Breeding always requires 1 male + 1 female parent. The specific gender of each parent doesn't affect the offspring - only that you have one of each.

Gender probabilities matter when you need a specific gender offspring for future breeding steps in your chain.

## Expected Attempts Formula

For any breeding step where a specific gender is needed:
```
Expected Attempts = 1 / Gender Probability
```

### Common Gender Ratios in Palworld

| Gender Ratio | Expected Attempts for ♂️ | Expected Attempts for ♀️ |
|--------------|-------------------------|-------------------------|
| 50% / 50%    | 2 attempts              | 2 attempts              |
| 70% / 30%    | 1.43 attempts           | 3.33 attempts           |
| 87.5% / 12.5%| 1.14 attempts           | 8 attempts              |
| 85% / 15%    | 1.18 attempts           | 6.67 attempts           |

## Real-World Example

Consider you have these Pals and want to breed Orserk:
- Relaxaurus (♂️)
- Penking (♂️) 
- Bushi (♀️)

### Path A (Gender-Optimized)
```
1. Penking (♂️) + Bushi (♀️) → Anubis
2. Anubis (any) + Relaxaurus (♂️) → Orserk
Total: 2 steps, 2-3 attempts (depending if you get ♀️ Anubis first try)
```

### Path B (Gender-Problematic)
```
1. Mossanda (♂️) + Grizzbolt (♀️) → Mammorest (87.5% ♂️ / 12.5% ♀️)
2. Mammorest (♀️) + Relaxaurus (♂️) → Orserk
Total: 2 steps, but ~8 attempts to get ♀️ Mammorest to pair with your ♂️ Relaxaurus
```

The algorithm chooses Path A because you're more likely to get a compatible gender quickly.

## Optimization Implications

The breeding calculator's optimization algorithm:
1. **Always considers gender probabilities** when calculating expected attempts
2. **May choose longer paths** if they avoid rare gender requirements
3. **Compounds probabilities** when multiple specific genders are needed

### Example Calculation
Path requiring:
- Step 1: Any gender (1 attempt)
- Step 2: 30% gender (3.33 attempts)
- Step 3: 50% gender (2 attempts)

Total expected attempts: 1 + 3.33 + 2 = **6.33 attempts**

## Visual Indicators

In the breeding tree, gender requirements should be clearly marked:
- ✓ No specific gender needed
- ♂️/♀️ Specific gender required
- ⚠️ Rare gender needed (affects attempts)

This ensures users understand why certain paths are recommended over others, even if they appear longer at first glance.