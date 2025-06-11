# Use Cases Directory

## Overview
This directory contains the business logic layer of the application, implementing use cases that handle API requests.

## Structure

### index.ts
Barrel export that re-exports all use cases for easy importing.

### pals/
Contains all Pal-related use cases.

#### pals/list/
Implementation of the list Pals use case.

**Files:**
- **index.ts**: Exports the ListPalsUseCase
- **list-pals.usecase.ts**: Main implementation
  - Handles pagination (page, limit parameters)
  - Applies filters (name, types, suitabilities, drops, key)
  - Integrates with Elasticlunr service for search
  - Returns paginated response with metadata

**Key Functions:**
- `execute()`: Main function that:
  1. Gets search results from Elasticlunr service
  2. Applies additional filters
  3. Paginates results
  4. Returns response object with content, page, limit, count, and total

- `isSameValueOrIncludedInList()`: Helper function for filtering
  - Handles both string and array field comparisons

#### pals/list/tests/
Contains test files for the list Pals use case.

## Response Format
```typescript
{
  content: IPal[],  // Array of Pal objects
  page: number,     // Current page
  limit: number,    // Items per page
  count: number,    // Items in current page
  total: number     // Total items available
}
```

## Usage
The ListPalsUseCase is called directly from the main API endpoint in `src/index.ts` and handles all the business logic for querying and filtering Pal data.