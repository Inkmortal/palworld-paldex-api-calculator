# Common Directory - Shared Types and Interfaces

## Overview
This directory contains all shared TypeScript interfaces and enums used throughout the application.

## Structure

### interfaces/
TypeScript interface definitions for core data models:

- **index.ts**: Barrel export file for all interfaces
- **pal.interface.ts**: Main Pal data structure
  - id, key, name, description
  - types, suitabilities, drops
  - image URLs and wiki links
  - skills, stats, aura
  - breeding metadata
  
- **breed.interface.ts**: Breeding system interfaces
  - `IBreedMeta`: Contains rank, order, child_eligible, male_probability
  - Used for breeding calculations

- **skill.interface.ts**: Skill data structure
  - level, name, type
  - cooldown, power
  - description

- **stats.interface.ts**: Pal statistics
  - HP, attack (melee/ranged)
  - defense, speed (ride/run/walk)
  - stamina, support

- **suitability.interface.ts**: Work suitability data
  - type (farming, watering, etc.)
  - level (1-5)
  - image path

- **aura.interface.ts**: Special ability/aura data
  - name, description
  - tech requirements

### enums/
TypeScript enums for type safety:

- **index.ts**: Barrel export for all enums
- **types.enum.ts**: Elemental types (fire, water, grass, etc.)
- **suitabilities.enum.ts**: Work suitability types

## Usage
These interfaces and enums provide type safety throughout the application and ensure consistent data structures when working with Pal data.