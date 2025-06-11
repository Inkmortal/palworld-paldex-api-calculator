# Product Context

## Why This Project Exists

### Original API Context
The Palworld Paldex API is the **first API for Palworld**, created to provide programmatic access to game data. Palworld is a monster-collecting survival game where players capture, breed, and utilize creatures called "Pals" for various activities.

### The Breeding Calculator Need
While the original API provides comprehensive Pal data, it lacks specific breeding calculation functionality. Players need:
- A way to plan breeding strategies
- Understanding of which Pals produce specific offspring
- Optimization for desired traits and skills
- Visual tools to explore breeding possibilities

## Problems Being Solved

### For Developers
1. **No Breeding Endpoints**: Original API doesn't calculate breeding outcomes
2. **Complex Manual Calculations**: Breeding involves formulas and special cases
3. **Data Navigation**: Hard to explore parent-child relationships

### For Players
1. **Breeding Complexity**: 100+ Pals with complex breeding rules
2. **Special Combinations**: 40+ special breeding pairs to remember
3. **Planning Difficulty**: Hard to plan multi-generation breeding paths
4. **Resource Optimization**: Breeding requires resources (cakes), need efficient planning

## How It Should Work

### User Experience Goals
1. **Simple Selection**: Easy dropdown/search for parent Pals
2. **Instant Results**: Quick calculation of breeding outcomes
3. **Visual Feedback**: See Pal images and special combination indicators
4. **Comprehensive Info**: Show stats, types, and breeding metadata

### Technical Experience Goals
1. **Fast API**: Sub-100ms response times for calculations
2. **Accurate Results**: Match in-game breeding mechanics exactly
3. **Clean Integration**: Clear API endpoints for breeding operations
4. **Extensible Design**: Easy to add features like skill inheritance

## Target Users

### Primary Users
- **Palworld Players**: Need breeding planning tools
- **Game Guide Writers**: Create breeding guides and resources
- **Community Tool Developers**: Build on top of the API

### Use Cases
1. **Quick Breeding Check**: "What do I get if I breed X with Y?"
2. **Reverse Lookup**: "How do I breed a specific Pal?"
3. **Optimization**: "What's the best path to get Pal Z with traits A and B?"
4. **Exploration**: "What special combinations exist?"

## Product Vision
Create the definitive Palworld breeding calculator that becomes the go-to tool for the community, providing accurate calculations through both a user-friendly web interface and a developer-friendly API.