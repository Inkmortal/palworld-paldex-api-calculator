# Breeding API

## Overview
This directory contains the custom breeding calculator API that extends the original Palworld Paldex API with breeding-specific functionality.

## Architecture
The breeding API is designed to be completely separate from the original API to maintain fork synchronization. It provides endpoints for:
- Breeding calculations between two Pals
- Finding all breeding combinations for a specific Pal
- Retrieving breeding-optimized Pal data

## Files

### index.ts
Barrel export file for all breeding API modules.

### interfaces.ts
TypeScript interfaces specific to breeding functionality:
- `IBreedingRequest`: Request structure for breeding calculations
- `IBreedingResult`: Result of a breeding calculation
- `IBreedingChainRequest`: Request for multi-generation breeding paths
- `IBreedingChainStep`: Single step in a breeding chain
- `IBreedingChainResult`: Complete breeding chain result
- `IPassiveSkillInheritance`: Passive skill inheritance data

### calculator.ts
Core breeding logic implementation:
- `calculateBreeding()`: Calculates offspring from two parents
- `getBreedingCombinations()`: Finds all parent combinations for a target Pal
- `getAllPals()`: Returns all Pals with breeding data
- Handles special breeding combinations from the game
- Implements standard breeding formula: `floor((parent1_rank + parent2_rank + 1) / 2)`

### routes.ts
ElysiaJS routes for the breeding API:
- `GET /api/breeding/calculate?parent1={key}&parent2={key}`: Calculate breeding result
- `GET /api/breeding/combinations/{palId}`: Get all breeding combinations for a Pal
- `GET /api/breeding/pals`: Get all Pals with breeding-relevant data

## Usage
The breeding API is mounted in the wrapper server at `/api/breeding/*` and runs alongside the original API without modifying it.

## Future Enhancements
- Passive skill inheritance calculations
- Multi-generation breeding path finding
- Breeding probability calculations
- Gender ratio considerations
- Breeding cost optimization