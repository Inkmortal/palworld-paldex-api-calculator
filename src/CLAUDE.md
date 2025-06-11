# Source Directory Structure

## Overview
This directory contains all the application source code and data files for the Palworld Paldex API.

## Main Files

### index.ts
The application entry point that:
- Sets up the ElysiaJS server on port 3000
- Configures static file serving
- Defines the main GET / endpoint
- Uses the ListPalsUseCase to handle requests

## Data Files

### pals.json
Complete Pal data including:
- Basic info (id, key, name, description)
- Types and elemental affinities
- Work suitabilities and levels
- Item drops
- Skills with levels and descriptions
- Stats (HP, attack, defense, speed, etc.)
- Breeding metadata (rank, order, eligibility)
- Assets and visual data

### breeding.json
Breeding combination data:
- Key: Child Pal ID
- Value: Array of parent pair combinations [parentA_id, parentB_id]
- Used for special breeding cases that don't follow the standard formula

### passive_skills.json
Passive skill definitions:
- Skill identifiers
- Names and descriptions
- Positive/negative effects
- Tier ratings

### item.json
Item data including:
- Item names and keys
- Categories
- Descriptions

### gear.json
Equipment and gear data

### PaldexDistributionData.json
Additional Pal distribution or spawn data

## Subdirectories

### common/
Shared TypeScript interfaces and enums used throughout the application

### services/
Service layer containing the Elasticlunr search service

### useCases/
Business logic layer with use cases for handling API requests

### schemas/
Request/response validation schemas for the API endpoints