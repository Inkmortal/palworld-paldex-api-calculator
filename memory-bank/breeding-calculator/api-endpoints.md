# API Endpoints Documentation

## Existing API Endpoints

### Original Paldex API

#### GET /api/v1/ (via proxy)
Main endpoint for querying Pal data with comprehensive filtering and search.

**Query Parameters:**
- `page` (number): Page number for pagination (default: 1)
- `limit` (number): Results per page (default: 10)
- `term` (string): Full-text search across all indexed fields
- `name` (string): Filter by exact Pal name
- `key` (string): Filter by Pal key (e.g., "001" for Lamball)
- `types` (string): Filter by element type
- `suitabilities` (string): Filter by work suitability
- `drops` (string): Filter by item drops

**Response Structure:**
```json
{
  "content": [
    {
      "id": 1,
      "key": "001",
      "name": "Lamball",
      "image": "/public/images/paldeck/001.png",
      "types": ["neutral"],
      "suitability": [...],
      "drops": ["wool", "lamball_mutton"],
      "skills": [...],
      "stats": {...},
      "breed": {
        "rank": 1470,
        "order": 1,
        "child_eligble": true,
        "male_probability": 50.0
      }
    }
  ],
  "page": 1,
  "limit": 10,
  "count": 10,
  "total": 137
}
```

### Breeding API Endpoints

#### GET /api/breeding/pals
Returns all Pals with breeding-specific data optimized for the calculator.

**Response Structure:**
```json
{
  "pals": [
    {
      "id": 1,
      "key": "001",
      "name": "Lamball",
      "image": "/public/images/paldeck/001.png",
      "types": ["neutral"],
      "breed": {
        "rank": 1470,
        "order": 1,
        "child_eligible": true,
        "male_probability": 50.0
      }
    }
  ],
  "count": 137
}
```

#### GET /api/breeding/calculate
Calculates the breeding result between two parents.

**Query Parameters:**
- `parent1` (string, required): Key of first parent (e.g., "001")
- `parent2` (string, required): Key of second parent

**Response Structure:**
```json
{
  "child": {
    "id": 1,
    "key": "001",
    "name": "Lamball",
    "image": "/public/images/paldeck/001.png",
    // ... full Pal data
  },
  "probability": 1.0,
  "specialCombination": false
}
```

#### GET /api/breeding/combinations/{palId}
Returns all possible parent combinations that can produce the target Pal.

**Path Parameters:**
- `palId` (string): Key of the target Pal

**Response Structure:**
```json
{
  "targetPalId": "100",
  "combinations": [
    {
      "parent1": {
        "id": 11,
        "key": "011",
        "name": "Penking",
        "image": "/public/images/paldeck/011.png"
      },
      "parent2": {
        "id": 72,
        "key": "072", 
        "name": "Bushi",
        "image": "/public/images/paldeck/072.png"
      }
    }
  ],
  "count": 5
}
```

## Required New Endpoints for Breeding Calculator

### POST /api/breeding/optimize
Finds optimal breeding path to target Pal(s) considering owned Pals and passive requirements.

**Request Body:**
```json
{
  "targets": [
    {
      "palKey": "100",
      "requiredPassives": ["legend", "lucky", "swift"] // optional
    }
  ],
  "ownedPals": [
    {
      "palKey": "001",
      "gender": "male",
      "passives": ["swift", "runner"]
    }
  ],
  "strategy": "min_steps" // or "breed_priority"
}
```

**Response Structure:**
```json
{
  "paths": [
    {
      "target": "100",
      "targetPassives": ["legend", "lucky", "swift"],
      "totalSteps": 3,
      "totalCakes": 3,
      "breedingChain": [
        {
          "step": 1,
          "parent1": { "palKey": "011", "source": "owned", "gender": "male" },
          "parent2": { "palKey": "072", "source": "breed", "gender": "female" },
          "offspring": {
            "palKey": "100",
            "genderNeeded": null,
            "genderProbability": { "male": 0.7, "female": 0.3 }
          },
          "expectedAttempts": 1,
          "passiveGoals": ["legend", "lucky", "swift"]
        }
      ],
      "requiredCatches": []
    }
  ]
}
```

### POST /api/breeding/passive-analysis
Analyzes passive inheritance possibilities for a breeding pair.

**Request Body:**
```json
{
  "parent1": {
    "palKey": "011",
    "gender": "male",
    "passives": ["legend", "swift"]
  },
  "parent2": {
    "palKey": "072", 
    "gender": "female",
    "passives": ["lucky", "artisan"]
  },
  "desiredPassives": ["legend", "lucky", "swift"]
}
```

**Response Structure:**
```json
{
  "availablePassives": {
    "fromParent1": ["legend", "swift"],
    "fromParent2": ["lucky", "artisan"],
    "combined": ["legend", "swift", "lucky", "artisan"]
  },
  "inheritance": {
    "canInheritAll": true,
    "missingPassives": [],
    "strategy": "Male parent has 'legend' (50.6% rate), breed until desired combination"
  }
}
```

### POST /api/breeding/multi-generation
Calculates all possible Pals reachable within N generations from owned collection.

**Request Body:**
```json
{
  "ownedPals": [
    { "palKey": "001", "gender": "male" },
    { "palKey": "002", "gender": "female" }
  ],
  "maxGenerations": 3
}
```

**Response Structure:**
```json
{
  "generations": {
    "1": ["003", "004", "005"],
    "2": ["010", "011", "012"],
    "3": ["020", "021", "022"]
  },
  "totalReachable": 15
}
```

## Static Assets

All Pal images and icons are served through the static plugin:
- Pal portraits: `/public/images/paldeck/{key}.png`
- Element icons: `/public/images/elements/{type}.png`
- Work icons: `/public/images/works/{work}.png`
- Item icons: `/public/images/items/{item}.png`

## Implementation Notes

1. **Passive Skills Data**: Currently stored in `passive_skills.json` but not exposed via API. Need to add endpoint or include in Pal data.

2. **Gender Optimization**: When implementing breeding paths, consider gender probabilities to minimize expected breeding attempts.

3. **Caching**: Breeding calculations should be cached as they're deterministic based on input.

4. **Error Handling**: All endpoints should validate Pal keys and return appropriate error messages.

5. **Performance**: For multi-generation calculations, implement depth limits to prevent exponential growth.