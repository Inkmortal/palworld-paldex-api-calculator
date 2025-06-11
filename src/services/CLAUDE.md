# Services Directory

## Overview
This directory contains service layer implementations that handle data access and search functionality.

## Files

### index.ts
Barrel export file that exports all services for easy importing elsewhere in the application.

### elasticunr.service.ts
Full-text search service implementation using Elasticlunr.

**Key Features:**
- Loads `pals.json` data at startup using Bun's file API
- Configures Elasticlunr search index with fields:
  - types
  - suitabilities
  - name
  - description
  - drops
  - key
- Uses Pal ID as the reference field
- Transforms suitability data for indexing

**Main Function:**
- `execute(query?: string)`: 
  - Returns all Pals if no query provided
  - Performs full-text search across indexed fields
  - Returns filtered Pal array matching search results

## Usage
The Elasticlunr service is used by the ListPalsUseCase to provide search functionality for the API. It enables users to search for Pals by name, type, drops, and other indexed fields through the `term` query parameter.